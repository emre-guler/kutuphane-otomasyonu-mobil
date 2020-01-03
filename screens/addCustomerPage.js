import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
export default class addCustomerPage extends Component {
  constructor(){
    super();
    this.state = {
      usernameText: '',
      tcIdText: ''
    };
    this.addCustomer = this.addCustomer.bind(this);
  }
  addCustomer(){
    const {navigate} = this.props.navigation;
    fetch('',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'operation': 'addCustomer',
        'token': 'wJAVkz6f4StdbeREiQAo15WMlON8NV64vBEyn5SmRx6iFGUrcEd27SlRbOQRJbaP',
        'fullnamedata': this.state.usernameText,
        'tciddata': this.state.tcIdText,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson == "Ok")
      {
        Alert.alert("Customer added.")
        navigate('customeroperation');
      }
      else if(responseJson == 'Error')
      {
        Alert.alert("Wrong.");
      }
      else if(responseJson == "404")
      {
        Alert.alert("Operation not found.");
      }
    })
    .catch((error) => {
      Alert.alert("There is a problem. Contact with us.");
    });
  }
  static navigationOptions = {
    header : null   
 };
 handleUsernameText = (newValue) => {
   this.setState({usernameText: newValue});
 }
 handleTcIdText = (newValue) => {
   this.setState({tcIdText: newValue});
 }
  render(){
    return(
      <View style={styles.screen}>
        <View style={styles.bigTitleContainer}>
          <Text style={styles.bigTitle}>New Customer</Text>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>Full Name:</Text>
          <TextInput style={styles.usernameInput} onChangeText={this.handleUsernameText}/>
        </View>
        <View style={styles.tcContainer}>
          <Text style={styles.tcText}>TC ID Number:</Text>
          <TextInput style={styles.tcInput} onChangeText={this.handleTcIdText}/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.addCustomer}>
            <Text style={styles.buttonText}>Add Customer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgb(31,31,31)',
    alignItems: 'center'
  },
  bigTitleContainer: {
    alignItems: 'center'
  },
  bigTitle: {
    color: '#ffdd00',
    marginTop: 100,
    fontSize: 24
  },
  usernameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    top: 75
  },
  usernameText: {
    color: '#ffdd00',
    fontSize: 16,
    marginRight: 25
  },
  usernameInput: {
    backgroundColor: 'rgb(31,31,31)',
    borderBottomWidth: 2,
    borderBottomColor: '#ffdd00',
    fontSize: 16,
    width: '40%',
    color: '#fff'
  },
  tcContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    top: 120
  },
  tcText: {
    color: '#ffdd00',
    fontSize: 16,
    marginRight: 25
  },
  tcInput: {
    backgroundColor: 'rgb(31,31,31)',
    borderBottomWidth: 2,
    borderBottomColor: '#ffdd00',
    fontSize: 16,
    width: '40%',
    color: '#fff'
  },
  buttonContainer: {
    top: 150,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffdd00',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    margin: 20
  },
  buttonText: {
    color: '#ffdd00',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
