import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native';
import { Textarea,Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base'

import * as firebase from 'firebase';

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



export default class Lists extends React.Component {


  render() {
    return (
   
		<Content padder  style={ { height: 300 } }>
			  <Form>
				<Textarea rowSpan={7} bordered placeholder="How do you feel today" />
			  </Form>
			</Content>      
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});