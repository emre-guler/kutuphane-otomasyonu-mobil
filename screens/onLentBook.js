import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView  } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import LoadingPage from './Loading';

export default class onLentBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Fullname', 'Book Name', 'Last Date' ,'Operation'],
      tableData: [],
      isLoaded: false,
    }
    this.taketItBack = this.taketItBack.bind(this);
  }
  taketItBack = async (index) => {
    let bookuserdata = this.state.tableData[index][0];
    const response = await fetch('',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'operation': 'takeItBack',
        'token': 'wJAVkz6f4StdbeREiQAo15WMlON8NV64vBEyn5SmRx6iFGUrcEd27SlRbOQRJbaP',
        'bookuserIddata': bookuserdata
      })
    });
    let dataString = await response.json();
    dataString = await JSON.parse(dataString);
    if(dataString == 'Ok')
    {
      Alert.alert("Book returend to library.");
    }
    else
    {
      Alert.alert("Something went wrong.");
    }
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
        'operation': 'viewLentBooks',
        'token': 'wJAVkz6f4StdbeREiQAo15WMlON8NV64vBEyn5SmRx6iFGUrcEd27SlRbOQRJbaP',
      })
    })
    let dataString = await response.json();
    dataString = await JSON.parse(dataString);
    let lastArray = [];
    let newArray = [];
    for(let i = 0; i != dataString.length; i++)
    {
      newArray[0] = dataString[i][0];
      newArray[1] = dataString[i][1];
      newArray[2] = dataString[i][2];
      newArray[3] = '',
      lastArray.push(newArray);
      newArray = [];
    }
    this.setState({isLoaded: true});
    this.setState({tableData: lastArray});
  }
  render() {
    const {navigate} = this.props.navigation;
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this.taketItBack(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Take it Back</Text>
        </View>
      </TouchableOpacity>
    );
    if(!state.isLoaded)
    {
      this.sendRequest();
      return(
        <LoadingPage />
      )
    }
    else
    {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.bigTitleContainer}>
              <Text style={styles.bigTitle}>On Lent Books</Text>
          </View>
          <ScrollView style={styles.dataWrapper} horizontal={true}>
            <Table borderStyle={{borderColor: 'transparent'}} style={{marginTop: 50}}>
              <Row data={state.tableHead} style={styles.head} widthArr={state.widthArr} textStyle={styles.text}/>
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
    dataWrapper:{
      marginTop: -1
    },
    bigTitle:{
        color: '#ffdd00',
        fontSize: 24
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
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffdd00',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight:15,
  },
  btnText: {
    color: '#ffdd00',
    alignItems: 'center',
    justifyContent: 'center',
   },
});
