import React from 'react';
import {StyleSheet, View, Image, ScrollView, Text, TouchableOpacity} from 'react-native';

const data = [
    {
        name: 'Jared Zichner',
        uri: 'https://a.wattpad.com/cover/168028172-352-k664370.jpg',
    },
    {
        name: 'Elsa Arendelle',
        uri: 'https://www.hackthebox.eu/storage/avatars/1ea05a64b43381e4c51d8f0a23f4f795.png',
    },
    {
        name: 'Lyzier Smith',
        uri: 'https://pbs.twimg.com/media/D_vA0I1UwAEz5mk.jpg',
    },   
]

class GroupInfo extends React.Component {

    renderItem = (props) => {
        return <View style={styles.personContainer}>
            <Image style={styles.image} source={{uri: props.uri}}/> 
            <Text style={styles.textLabel}>
                {props.name}
            </Text>
        </View>
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={this.props.onComplete}>
                    <View>
                        <Text style={styles.textTitle}> Your Community </Text>
                        {data.map(this.renderItem)}
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    personContainer: {
        margin: 15,
        backgroundColor: '#eaeaea',
        borderColor: '#0084A4',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        padding: 15,
    },
    textLabel: {
        fontSize: 16,
        flex: 1,
        paddingLeft: 15,
    },
    textTitle: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'fjalla-one',

    }
})

export default GroupInfo;