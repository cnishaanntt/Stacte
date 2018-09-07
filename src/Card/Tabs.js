import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    FlatList,
	ScrollView,
	StatusBar,
	ListView
} from "react-native";
import { Input, Item, Fab ,Container, Content, Thumbnail, Header, Left, Body, Right, Segment, Button, Form, Textarea, Icon, List, ListItem  } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PieChart, BarChart, Grid } from 'react-native-svg-charts';

import * as firebase from 'firebase';


var { height, width } = Dimensions.get('window');

// Initialize Firebase
const firebaseConfig = {
  // ADD YOUR FIREBASE CREDENTIALS
  apiKey: "AIzaSyAX7WjZKFF2lkunK9eNTOdll8_LNAN3paQ",
  authDomain: "react-fiery.firebaseapp.com",
  databaseURL: "https://react-fiery.firebaseio.com",
  projectId: "react-fiery",
  storageBucket: "react-fiery.appspot.com",
  messagingSenderId: "778641943103"
};

firebase.initializeApp(firebaseConfig);
var reminder_data=[]
var feeling_data=[]
class Tabs extends Component {
	
    constructor(props) {
		console.ignoredYellowBox = [
			'Setting a timer'
		]
		super(props)    
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            activeIndex: 0,
			Fabactive:true,
			listViewReminderData: reminder_data,
			newReminder: "",
			listViewFeelingData:feeling_data,
			newFeeling:""
        }
    }
	
	componentDidMount() {
		var that = this
		
		firebase.database().ref('/feelings').on('child_added', function (data) {
		  var newData = [...that.state.listViewFeelingData]
		  newData.push(data)
		  that.setState({ listViewFeelingData: newData })
		})
		
		firebase.database().ref('/reminders').on('child_added', function (data) {
		  var newData = [...that.state.listViewReminderData]
		  newData.push(data)
		  that.setState({ listViewReminderData: newData })
		})
	}

    segmentClicked(index) {
        this.setState({
            activeIndex: index
        })
    }
	
    checkActive = (index) => {
        if (this.state.activeIndex !== index) {
            return (
                { color: 'grey' }
            )
        }
        else {
            return (
                {}
            )
        }
    }
	
	addReminderRow=(data)=> {
		var key = firebase.database().ref('/reminders').push().key
		firebase.database().ref('/reminders').child(key).set({ reminder: data })
		this.setState({newReminder: "" })
	}
	
	addFeelingRow=(data)=> {
		var key = firebase.database().ref('/feelings').push().key
		firebase.database().ref('/feelings').child(key).set({ feeling: data })
		this.setState({newFeeling: "" })
	}  
  
	async deleteReminderRow(secId, rowId, rowMap, data) {
		await firebase.database().ref('reminders/' + data.key).set(null)
		rowMap[`${secId}${rowId}`].props.closeRow();
		var newData = [...this.state.listViewReminderData];
		newData.splice(rowId, 1)
		this.setState({ listViewReminderData: newData });
	}
  
	async deleteFeelingRow(secId, rowId, rowMap, data) {
		await firebase.database().ref('feelings/' + data.key).set(null)
		rowMap[`${secId}${rowId}`].props.closeRow();
		var newData = [...this.state.listViewFeelingData];
		newData.splice(rowId, 1)
		this.setState({ listViewFeelingData: newData });
	}
	  
	showInformation() {
		console.log('Reminder Info')
	}
	
	
	
	
	renderSectionOne(){
		return (
		<Container style={ { height: 300 } }>
			<Content padder >
				<Item>
				  <Input
					ref={component => this.messageInput = component} 
					value={this.state.newFeeling} 
					onChangeText={(newFeeling) => {this.setState({ newFeeling })}}
					placeholder="How do you feel today?"
				  />
				  <Button onPress={() => this.addFeelingRow(this.state.newFeeling)}>
					<Icon name="add" />
				  </Button>
				</Item>			  
			</Content>   
			<Content>
			  <List
				enableEmptySections
				dataSource={this.ds.cloneWithRows(this.state.listViewFeelingData)}
				renderRow={data =>
				  <ListItem>
					<Text> {data.val().feeling}</Text>
				  </ListItem>
				}
				renderLeftHiddenRow={data =>
				  <Button full >
					<Icon name="information-circle" />
				  </Button>
				}
				renderRightHiddenRow={(data, secId, rowId, rowMap) =>
				  <Button full danger onPress={() => this.deleteFeelingRow(secId, rowId, rowMap, data)}>
					<Icon name="trash" />
				  </Button>

				}

				leftOpenValue={-75}
				rightOpenValue={-75}

			  />
			</Content>
		</Container>
		)
	}

	renderSectionTwo(){
		return (
		<Container style={ { height: 300 } }>
			<Content padder >
				<Item>
				  <Input
					ref={component => this.messageInput = component} 
					value={this.state.newReminder} 
					onChangeText={(newReminder) => this.setState({ newReminder })}
					placeholder="Add Reminder"
				  />
				  <Button onPress={() => this.addReminderRow(this.state.newReminder)}>
					<Icon name="add" />
				  </Button>
				</Item>			  
			</Content>   
			<Content>
			  <List
				enableEmptySections
				dataSource={this.ds.cloneWithRows(this.state.listViewReminderData)}
				renderRow={data =>
				  <ListItem>
					<Text> {data.val().reminder}</Text>
				  </ListItem>
				}
				renderLeftHiddenRow={data =>
				  <Button full >
					<Icon name="information-circle" />
				  </Button>
				}
				renderRightHiddenRow={(data, secId, rowId, rowMap) =>
				  <Button full danger onPress={() => this.deleteReminderRow(secId, rowId, rowMap, data)}>
					<Icon name="trash" />
				  </Button>

				}

				leftOpenValue={-75}
				rightOpenValue={-75}

			  />
			</Content>
		</Container>
		)
	}
	renderSectionThree() {       
        const fill = 'rgb(134, 65, 244)'
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
		const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))
 
        return (
		<View>
            <PieChart
                style={ { height: 300 } }
                data={ pieData }
            />
		</View>
        )
    }
	renderSectionFour(){		
		
            return (
			<View style={{ height: 300 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 7 }}>
                            

                            <View style={{ flexDirection: 'row', 'alignItems': 'center' }}>
                                <Icon name="md-play" style={{ fontSize: 14 }}></Icon>
                                <Text style={{ fontWeight: 'bold' }}> Broadcast</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
									justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    paddingStart: 5,
                                    paddingEnd: 5
                                }}

                            >
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/1.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/2.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/3.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/4.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/5.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/6.jpg')} />
								  <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/1.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/2.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/3.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/4.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/5.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('./assets/StoriesHeaderThumbnails/6.jpg')} />
                            </ScrollView>
                    </View>
					
					<View style={{ flex: 1 }}>
							<Fab
								Fabactive={this.state.Fabactive}
								direction="left"
								containerStyle={{ }}
								style={{ backgroundColor: '#5067FF' }}
								position="bottomRight"
								onPress={() => this.setState({ Fabactive: !this.state.Fabactive })}>
								<Icon name="share" />
								<Button style={{ backgroundColor: '#34A34F' }}>
								  <Icon name="logo-whatsapp" />
								</Button>
								<Button style={{ backgroundColor: '#3B5998' }}>
								  <Icon name="logo-facebook" />
								</Button>
								<Button disabled style={{ backgroundColor: '#DD5144' }}>
								  <Icon name="mail" />
								</Button>
							  </Fab>
						</View>
                </View>
		)		
	}
	
	
	
	 renderSection() {

        if (this.state.activeIndex == 0) {
            return (
            <View style={{ flexDirection: 'row' }}>
				   {this.renderSectionOne()}
			</View>
               
            )

        }
		else if (this.state.activeIndex == 1) {
			 return (
                <View style={{ flexDirection: 'row' }}>
                    {this.renderSectionTwo()}
                </View>
            )
			
		}
		else if (this.state.activeIndex == 2) {
			 return (
                <View>
                    {this.renderSectionThree()}
                </View>
            )
			
		}
		else if (this.state.activeIndex == 3) {
			 return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.renderSectionFour()}
                </View>
            )
			
		}
	 }
  

    render() {
        return (
				<View >
					<View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5' }}>
						<Button
							onPress={() => this.segmentClicked(0)}
							transparent active={this.state.activeIndex == 0}
						>
							<Icon name="ios-apps-outline"
								style={[this.state.activeIndex == 0 ? {} : { color: 'grey' }]} >
							</Icon>
						</Button>
						<Button
							onPress={() => this.segmentClicked(1)}
							transparent active={this.state.activeIndex == 1}>
							<Icon name="ios-list-outline" style={[{ fontSize: 32 }, this.state.activeIndex == 1 ? {} : { color: 'grey' }]}></Icon>
						</Button>
						<Button
							onPress={() => this.segmentClicked(2)}
							transparent active={this.state.activeIndex == 2}>
							<Icon name="ios-bookmark-outline" style={this.state.activeIndex == 2 ? {} : { color: 'grey' }}></Icon>
						</Button>
						<Button
							onPress={() => this.segmentClicked(3)}
							transparent last active={this.state.activeIndex == 3}>
							<Icon name="ios-people-outline" style={[{ fontSize: 32 }, this.state.activeIndex == 3 ? {} : { color: 'grey' }]}></Icon>
						</Button>
					</View>             
				{this.renderSection()}
				
			</View>
        );
    }
}
export default Tabs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
