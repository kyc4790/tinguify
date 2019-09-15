import React from 'react';
import {StyleSheet, View, Text, Platform, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import TabBarIcon from '../../components/TabBarIcon';
import Colors from '../../constants/Colors';


const Interests = (props) => {
        console.log(props);
        return <View style={styles.pageContainer}>
            <View style={styles.itemContainer}>
                <Text style={styles.orientationText}>Fill out your interests to get matched to a community!</Text>
                <TouchableHighlight onPress={props.onComplete}>
                    <Ionicons
                        name={'ios-arrow-forward'}
                        size={48}
                        style={{ marginBottom: -3 }}
                        color={Colors.tabIconSelected}
                    />
                </TouchableHighlight>
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
    },
})

export default Interests;