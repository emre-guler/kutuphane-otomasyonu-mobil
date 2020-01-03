import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import LoadingPage from './Loading';
  
export default class bookOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tableHead: ['Id', 'Book Name', 'Author', ' Operation'],
      tableData: []
    }
    this.deleteIndex = this.deleteIndex.bind(this);
  }
  deleteIndex = async (index) => {
    const response = await fetch('',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'operation': 'deleteBook',
        'token': 'wJAVkz6f4StdbeREiQAo15WMlON8NV64vBEyn5SmRx6iFGUrcEd27SlRbOQRJbaP',
        'deleteBookId': this.state.tableData[index][0]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson == "Ok")
      {
        Alert.alert('Book deleted.');
      }
      else
      {
        Alert.alert("Something went wrong.");
      }
    })
  }
  static navigationOptions = {
    header: null
  }
   sendRequest = async () => {
    const response = await fetch("",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'operation': 'viewBooks',
        'token': 'wJAVkz6f4StdbeREiQAo15WMlON8NV64vBEyn5SmRx6iFGUrcEd27SlRbOQRJbaP',
      })
    })
    let dataString = await response.json();
    dataString = await JSON.parse(dataString);
    let lastArray = [];
    let newArray = [];
    for(let i = 0; i != dataString.length; i++)
    {
      newArray[0] = dataString[i].ID;
      newArray[1] = dataString[i].Author;
      newArray[2] = dataString[i].bookName;
      newArray[3] = '';
      lastArray.push(newArray);
      newArray = [];
    }
    this.setState({isLoaded: true});
    this.setState({tableData: lastArray});
  }
  render() {
    let state = this.state;
    if(!state.isLoaded){
      this.sendRequest();
      return (
        <LoadingPage/>
      )
    }
    else
    {
      let state = this.state;
      const {navigate} = this.props.navigation;
      const element = (data, index) => (
        <TouchableOpacity style={styles.btnContainer} onPress={() => this.deleteIndex(index)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Delete</Text>
          </View>
        </TouchableOpacity>
      );
      return (
        <ScrollView style={styles.container}>
          <View style={styles.bigTitleContainer}>
              <Text style={styles.bigTitle}>Book Operaiton</Text>
          </View>
          <ScrollView style={styles.dataWrapper} horizontal={true}>
            <Table borderStyle={{borderColor: 'transparent'}} style={{marginTop: 50}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
                state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </ScrollView>
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => navigate('addbook')}>
                  <Text style={styles.btnText}>Add Book</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      padding: 16, 
      paddingTop: 30,
      backgroundColor: 'rgb(31,31,31)',
    },
    bigTitleContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    bigTitle:{
        color: '#ffdd00',
        fontSize: 24
    },
    dataWrapper:{
      marginTop: -1,
    },
  head: { 
      height: 50, 
      backgroundColor: '#808B97' 
    },
  text: { 
      margin: 15, 
      color: '#fff',
      fontSize: 12
    },
  row: { 
    flexDirection: 'row', 
    backgroundColor: 'rgb(31,31,31)' 
},
  btn: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffdd00',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 25,

  },
  btnContainer:{
    justifyContent: 'flex-end'
  },
  btnText: {
    color: '#ffdd00',
    alignItems: 'center',
    justifyContent: 'center'
   },
   button:{
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
   buttonContainer:{
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 50,
       marginBottom: 50
   }
});
