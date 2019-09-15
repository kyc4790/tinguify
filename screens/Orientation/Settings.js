import React from 'react';
import {StyleSheet, View, Text, Platform, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import TabBarIcon from '../../components/TabBarIcon';
import Colors from '../../constants/Colors';


const Settings = (props) => {
        console.log(props);
        return <View style={styles.pageContainer}>
            <View style={styles.itemContainer}>
                <TouchableHighlight onPress={props.onComplete}>
                    <Ionicons
                        name={'ios-arrow-back'}
                        size={48}
                        style={{ marginBottom: -3 }}
                        color={Colors.tabIconSelected}
                    />
                </TouchableHighlight>
                <Text style={styles.orientationText}>Fill out your settings!</Text>
            </View>
        </View>
}

styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        margin: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orientationText: {
        flex: 1,
        fontSize: 48,
        textAlign: 'center',
        fontFamily: 'fjalla-one',
    },
})

export default Settings;