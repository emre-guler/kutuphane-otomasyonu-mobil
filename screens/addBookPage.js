import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
export default class addBookPage extends Component{
  constructor(){
    super();
    this.state = {
      bookNameText: '',
      authorText: '',
      pageText: ''
    }
    this.addBook = this.addBook.bind(this);
  }
  addBook(){
    const {navigate} = this.props.navigation;
    fetch('',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'operation': 'addBook',
        'token': 'wJAVkz6f4StdbeREiQAo15WMlON8NV64vBEyn5SmRx6iFGUrcEd27SlRbOQRJbaP',
        'booknamedata': this.state.bookNameText,
        'authordata': this.state.authorText,
        'pagedata': this.state.pageText
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson == "Ok")
      {
        navigate('bookoperaiton');
        Alert.alert("Book added.");
      }
      else if(responseJson == 'Error')
      {
        Alert.alert("There is a problem. Contact with us.");
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
  HandleBookNameText = (newValue) => {
    this.setState({bookNameText: newValue});
  }
  HandleAuthorText = (newValue) =>{
    this.setState({authorText: newValue});
  }
  HandlePageText = (newValue) => {
    this.setState({pageText: newValue});
  }
    render(){
        return(
        <View style={styles.screen}>
            <View style={styles.bigTitleContainer}>
                <Text style={styles.bigTitle}>New Book</Text>
            </View>
            <View style={styles.booknameContainer}>
                <Text style={styles.booknameText}>Book Name:</Text>
                <TextInput style={styles.booknameInput} onChangeText={this.HandleBookNameText} />
            </View>
            <View style={styles.authorContainer}>
                <Text style={styles.authorText}>Author:</Text>
                <TextInput style={styles.authorInput}  onChangeText={this.HandleAuthorText}/>
            </View>
            <View style={styles.pageConteiner}>
                <Text style={styles.pageText}>Page:</Text>
                <TextInput style={styles.pageInput} onChangeText={this.HandlePageText} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={this.addBook}>
                    <Text style={styles.buttonText}>Add Book</Text>
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
    booknameContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      top: 70
    },
    booknameText: {
      color: '#ffdd00',
      fontSize: 16,
      marginRight: 25
    },
    booknameInput: {
      backgroundColor: 'rgb(31,31,31)',
      borderBottomWidth: 2,
      borderBottomColor: '#ffdd00',
      fontSize: 16,
      width: '40%',
      color: '#fff'
    },
    authorContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      top: 115
    },
    authorText: {
      color: '#ffdd00',
      fontSize: 16,
      marginRight: 25
    },
    authorInput: {
      backgroundColor: 'rgb(31,31,31)',
      borderBottomWidth: 2,
      borderBottomColor: '#ffdd00',
      fontSize: 16,
      width: '40%',
      color: '#fff'
    },
    pageConteiner: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      top: 160
    },
    pageText: {
      color: '#ffdd00',
      fontSize: 16,
      marginRight: 25
    },
    pageInput: {
      backgroundColor: 'rgb(31,31,31)',
      borderBottomWidth: 2,
      borderBottomColor: '#ffdd00',
      fontSize: 16,
      width: '40%',
      color: '#fff'
    },
    buttonContainer: {
      top: 175,
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
      margin: 20,
    },
    buttonText: {
      color: '#ffdd00',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
