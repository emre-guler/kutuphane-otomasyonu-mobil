import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
export default class LoadingPage extends Component {
    static navigationOptions = {
        header : null  
    };
    render(){
        return(
            <View style={styles.loading}>
                <AnimatedEllipsis />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loading : {
        flex: 1,
        backgroundColor: 'rgb(31,31,31)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})