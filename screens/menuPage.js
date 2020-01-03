import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
export default class menuPage extends Component {
    static navigationOptions = {
        header : null
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={style.screen}>
                <View style={style.bigTitleContainer}>
                    <Text style={style.bigTitle}>Welcome To Library</Text>
                </View>
                <View style={style.buttonContainer}>
                    <TouchableOpacity style={style.button} onPress={() => navigate("givelentbook")}>
                        <Text style={style.buttonText}>Emanet Kitap İşlemleri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => navigate("onlentbook")}>
                        <Text style={style.buttonText}>Emanetteki Kitaplar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => navigate("customeroperation")}>
                        <Text style={style.buttonText}>Müşteri İşlemleri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => navigate('bookoperaiton')}>
                        <Text style={style.buttonText}>Kitap İşlemleri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => BackHandler.exitApp()}>
                        <Text style={style.buttonText}>Uygulamadan Çık</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const style = StyleSheet.create({
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
        marginTop: 75,
        fontSize: 24
    },
    buttonContainer: {
        top: 25,
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ffdd00',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: 200,
        margin: 15
    },
    buttonText: {
        color: '#ffdd00',
        fontSize: 12
    }
})