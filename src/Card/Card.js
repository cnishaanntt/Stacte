import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable';
import { View, StyleSheet, Text } from 'react-native'
import CardButtons from '../CardButtons'
import style from './style'
import Items from './Items'
import Tabs from './Tabs'

const flip = {
  0: {
    rotateY: '0deg'
  },
  1: {
    rotateY: '180deg'
  }
}

class Card extends Component {
  constructor() {
    super()
    this.state = {
      isFlipping: false,
      isFront: true
    }
  }

  handleRotate = () => {
    this.setState({
      isFlipping: true,
      isFront: !this.state.isFront
    })
    setTimeout(() => {
      this.setState({isFlipping: false})
    }, 1000)
  }

  render() {
	 
    return (
      <View style={style.container}>
        <Animatable.View animation={this.state.isFlipping ? flip : ''} style={style.cardContainer} duration={1000}>
          {!this.state.isFlipping && (
            <CardButtons flip={this.handleRotate}/>
          )}
		 
			  <View style={styles.container}>
					<Text style={{ fontWeight: 'bold', fontSize: 24 }}>I feel ...</Text>					
				<Items/>				
			  </View>
			  <View
				  style={{
					borderBottomColor: 'black',
					borderBottomWidth: 1,
				  }}
				/>
			 <View>
				<Tabs/>
			 </View>
			 <View
				  style={{
					borderBottomColor: 'black',
					borderBottomWidth: 1,
				  }}
				/>			
        </Animatable.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: .8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
	position:'absolute'
  }
});


export default Card;
