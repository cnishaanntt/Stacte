import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
// Initialize Firebase




const RenderedItems = [
  { id: "1", uri: require('./assets/1.jpg'), bp_score:2, glucose_score:2, message:' eating IceCream'},
  { id: "2", uri: require('./assets/2.jpg'), bp_score:0, glucose_score:-2, message:' having Paneer Curry'},
  { id: "3", uri: require('./assets/3.jpg'), bp_score:1, glucose_score:2, message:' getting Popcorn'},
  { id: "4", uri: require('./assets/4.jpg'), bp_score:0, glucose_score:-2, message:' eating Masala Peas, Yogurt and more...'},
  { id: "5", uri: require('./assets/5.jpg'), bp_score:2, glucose_score:2, message:' having Bread Sandwich'},
  { id: "6", uri: require('./assets/6.jpg'), bp_score:2, glucose_score:2, message:' lonely'},
  { id: "7", uri: require('./assets/7.jpg'), bp_score:2, glucose_score:2, message:' playing in the out'},
  { id: "8", uri: require('./assets/8.jpg'), bp_score:0, glucose_score:-2, message:' enjoying with friends'},
  { id: "9", uri: require('./assets/9.jpg'), bp_score:1, glucose_score:2, message:' listening Music'},
  { id: "10", uri: require('./assets/10.jpg'), bp_score:0, glucose_score:-2, message:' jumping like Steph..'},
  { id: "11", uri: require('./assets/11.jpg'), bp_score:2, glucose_score:2, message:' jogging early'},
  { id: "12", uri: require('./assets/12.jpg'), bp_score:2, glucose_score:2, message:' Cheerful'},
]

export default class Items extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 10, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
			
          })
		var key = firebase.database().ref('/feelings').push().key
		firebase.database().ref('/feelings').child(key).set({ feeling: 'I feel like'+ RenderedItems[this.state.currentIndex].message })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 10, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
		  var key = firebase.database().ref('/feelings').push().key
		firebase.database().ref('/feelings').child(key).set({ feeling: 'I do not feel like'+ RenderedItems[this.state.currentIndex].message  })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  renderItems = () => {

    return RenderedItems.map((item, i) => {


      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 360, width: SCREEN_WIDTH-120, padding: 0, position: 'relative' }]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '30deg' }], position: 'relative', top: 100, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 0, borderColor: 'green', color: 'green', fontSize: 36, fontWeight: '800', padding: 0 }}>I LIKE</Text>
            </Animated.View>
            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'relative', top: 100, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 0, borderColor: 'red', color: 'red', fontSize: 36, fontWeight: '800', padding: 0 }}>NOPE, I don't</Text>
            </Animated.View>
            <Image
              style={{ flex: .5, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />
          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View

            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 360, width: SCREEN_WIDTH-120, padding: 0, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 100, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 0 }}>I Like</Text>
            </Animated.View>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 100, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 0 }}>NOPE, I don't</Text>
            </Animated.View>

            <Image
              style={{ flex: .5, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />

          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 0 }}>

        </View>
        <View style={{ flex: 1, height: 60  }}>
          {this.renderItems()}
        </View>
        <View style={{ height: 0 }}>

        </View>


      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
