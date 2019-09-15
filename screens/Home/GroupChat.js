import React from 'react';
import {Image, View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const image = require('../../assets/images/group_chat.jpg')

class GroupChat extends React.Component {
    render() {
        return (<View style={styles.container}>
            <Image source={image} style={styles.image} />
            <TouchableHighlight style={styles.button} onPress={this.props.onComplete}>
                <Text> Go Back </Text>
            </TouchableHighlight>
        </View>)
    }
}

const styles= StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: width-50, 
        height: height-120
    },
    button: {
        borderColor: '#0084A4',
        borderWidth: 1,
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
})

export default GroupChat;