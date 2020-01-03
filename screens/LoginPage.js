import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
export default class LoginPage extends Component {
  constructor(){
    super();
    this.state = {
      usernameText: "",
      passwordText: "",
    };
    this.loginControl = this.loginControl.bind(this);
  }
  static navigationOptions = {
    header : null   
  };
  loginControl(){
    const {navigate} = this.props.navigation;
    fetch('https://0b61ec72.ngrok.io/api/library',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'operation': 'login',
        'token': 'wJAVkz6f4StdbeREiQAo15WMlON8NV64vBEyn5SmRx6iFGUrcEd27SlRbOQRJbaP',
        'usernamedata': this.state.usernameText,
        'passworddata': this.state.passwordText
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson == "Ok")
      {
        navigate('menu');
      }
      else if(responseJson == 'Error')
      {
        Alert.alert("This user not found.");
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
  handleChangeUsername = (newValue) => {
    this.setState({usernameText: newValue});
  }
  handleChangePassword = (newValue) => {
    this.setState({passwordText: newValue});
  }
  render(){
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.screen}>
        <View style={styles.bigTitleContainer}>
          <Text style={styles.bigTitle}>Library User Login</Text>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>Username:</Text>
          <TextInput style={styles.usernameInput} onChangeText={this.handleChangeUsername} />
        </View>
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordText}>Password:</Text>
          <TextInput style={styles.passwordInput} onChangeText={this.handleChangePassword} secureTextEntry/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigate('signin')}>
            <Text style={styles.buttonText}>Signin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.loginControl}>
            <Text style={styles.buttonText}>Login</Text>
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
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    top: 120
  },
  passwordText: {
    color: '#ffdd00',
    fontSize: 16,
    marginRight: 25
  },
  passwordInput: {
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