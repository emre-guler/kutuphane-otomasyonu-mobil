import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView  } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker';
import LoadingPage from './Loading';

export default class givelentBook extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    var dd = today.getDate() + 1;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    var today = dd + '/' + mm + '/' + yyyy;
    this.state = {
      tableHeadForBooks: ['Id', 'Book Name', 'Author' ,'Operation'],
      tableDataForBooks: [],
      tableHeadForCustomers: ['Name','Surname','TC Id','Operaiton'],
      tableDataForCustomers: [],
      dateLast: today,
      day: today,
      isLoaded: false,
      bookSelect: '',
      customerSelect: '',
    }
    this.sendRequest = this.sendRequest.bind(this); 
    this.HandleBookChange = this.HandleBookChange.bind(this);
    this.HandleCustomerChange = this.HandleCustomerChange.bind(this);
  }
  static navigationOptions = {
    header: null
  }
  sendRequest = async () => 
  {
    let response = await fetch("",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'operation': 'dataBook',
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
      newArray[1] = dataString[i].bookName;
      newArray[2] = dataString[i].Author;
      newArray[3] = '';
      lastArray.push(newArray);
      newArray = [];
    }
    this.setState({tableDataForBooks: lastArray});
    response = await fetch("",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'operation': 'dataCustomer',
        'token': 'wJAVkz6f4StdbeREiQAo15WMlON8NV64vBEyn5SmRx6iFGUrcEd27SlRbOQRJbaP',
      })
    })
    dataString = await response.json();
    dataString = await JSON.parse(dataString);
    lastArray = [];
    newArray = [];
    for(let i = 0; i != dataString.length; i++)
    {
      newArray[0] = dataString[i].ID;
      newArray[1] = dataString[i].Fullname;
      newArray[2] = dataString[i].tcId;
      newArray[3] = '';
      lastArray.push(newArray);
      newArray = [];
    }
    this.setState({tableDataForCustomers: lastArray});
    this.setState({isLoaded: true});
  }
  lentClicked = async () => 
  {
    const response = await fetch('',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'operation': 'giveBook',
        'token': 'wJAVkz6f4StdbeREiQAo15WMlON8NV64vBEyn5SmRx6iFGUrcEd27SlRbOQRJbaP',
        'bookIddata': this.state.bookSelect,
        'customerIddata': this.state.customerSelect,
        'receiveBookdata': this.state.dateLast.toString()
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson == "Ok")
      {
        Alert.alert("Book gave.");
      }
      else
      {
        Alert.alert("Somethink went wrong.");
      }
    })
  }
  HandleDateChange = (newValue) => 
  {
    this.setState({dateLast: newValue});
  }
  HandleBookChange(index) {
    this.setState({bookSelect: this.state.tableDataForBooks[index][0]});
  }
  HandleCustomerChange(index) {
    this.setState({customerSelect: this.state.tableDataForCustomers[index][0]});
  }
  render() {
    const {navigate} = this.props.navigation;
    const state = this.state;
    const elementForBooks = (data, index) => (
      <TouchableOpacity onPress={() => this.HandleBookChange(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Select this book</Text>
        </View>
      </TouchableOpacity>
    );
    const elementForCustomers = (data, index) => (
      <TouchableOpacity onPress={() => this.HandleCustomerChange(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Select this customer</Text>
        </View>
      </TouchableOpacity>
    );
    if(!state.isLoaded)
    {
      this.sendRequest();
      return(
        <LoadingPage/>
      )
    }
    else
    {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.bigTitleContainer}>
              <Text style={styles.bigTitle}>Give Lent Book</Text>
          </View>
          <ScrollView style={styles.dataWrapper} horizontal={true}>
            <Table borderStyle={{borderColor: 'transparent'}} style={{marginTop: 50}}>
              <Row data={state.tableHeadForBooks} style={styles.head} widthArr={state.widthArr} textStyle={styles.text}/>
              {
                state.tableDataForBooks.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 3 ? elementForBooks(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </ScrollView>
          <ScrollView style={styles.dataWrapper} horizontal={true}>
            <Table borderStyle={{borderColor: 'transparent'}} style={{marginTop: 50}}>
              <Row data={state.tableHeadForCustomers} style={styles.head} widthArr={state.widthArr} textStyle={styles.text}/>
              {
                state.tableDataForCustomers.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 3 ? elementForCustomers(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </ScrollView>
          <View style={styles.buttonContainer}>
              <View style={styles.datePickerContainer}>
                <Text style={styles.datePickText}>Date: </Text>
                <DatePicker style={{width: 200}} date={this.state.dateLast} onDateChange={this.HandleDateChange} placeholder='Select Date' format="DD-MM-YYYY" minDate={this.state.day} confirmBtnText='Confirm' cancelBtnText='Cancel' customStyles={{dateIcon:{position:'absolute', left: 0, top: 4, marginLeft: 0}, dateInput:{marginLeft:36, backgroundColor: '#fff'}}} />
              </View>
              <TouchableOpacity style={styles.button}>
                  <Text style={styles.btnText} onPress={this.lentClicked}>Give Lent Book</Text>
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
      minWidth: '100%'
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
   },
   datePickerContainer:{
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10
   },
   datePickText:{
    color: '#ffdd00',
    fontSize: 24,
    margin: 5
   }
});
