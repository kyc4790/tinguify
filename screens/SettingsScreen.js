import React from 'react';
import {ScrollView, StyleSheet, View, Slider, Text, TextInput, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Field = (props) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.textLabel}>
      {props.label}
    </Text>
    <Text style={styles.textDescription}>
      {props.description}
    </Text>
    <TextInput style={styles.textInput} onChangeText={props.onChangeText} value={props.value} />
  </View>
)


const SliderContainer = (props) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.textLabel}>
        {props.label + ': ' + props.value}
    </Text>
    <Text style={styles.textDescription}>
        {props.description}
    </Text>
    <View style={styles.sliderContainer}> 
        <Text> 3 </Text>
        <Slider style={{flex: 1}} minimumValue={3} maximumValue={20} value={props.value} onValueChange={props.onValueChange} minimumTrackTintColor={'#0084a4'}/>
        <Text> 20 </Text>
    </View>
  </View>
)


const renderSelectedItems = (props) => (
    <View style={styles.sliderContainer}>
        <TouchableOpacity onPress={() => props.toggle(props.index)}>
            <View style={styles.checkMarkContainer}>
                {props.selected ? <Ionicons
                    name={'ios-checkbox-outline'}
                    size={24}
                    style={{}}
                    color={'#0084A4'}
                />: <Ionicons
                    name={'ios-square-outline'}
                    size={24}
                    style={{}}
                    color={'#eaeaea'}
                />}
                <Text style={styles.textLabel}> {props.label} </Text>
            </View>
        </TouchableOpacity>
    </View>
)

const groupGenderOptions = [
    'Same gender only',
    'All genders'
]

const SelectorContainer = (props) => (
    <View style={styles.fieldContainer}>
        <Text style={styles.textLabel}>
            {props.label}
        </Text>
        <Text style={styles.textDescription}>
            {props.description}
        </Text>
        {groupGenderOptions.map((e, index) => renderSelectedItems({
            label: e,
            selected: index===props.value,
            toggle: props.toggle,
            index: index,
        }))}
    </View>
)

class SettingsScreen extends React.Component {
    state = {
        distance: '',
        size: 3,
        gender: -1,
    }

    updateDistance = (e) => {
        this.setState({
            distance: e,
        })
    }

    updateSize = (e) => {
        this.setState({
            size: Math.round(e)
        })
    }

    setGender = (e) => {
        this.setState({
            gender: e,
        })
    }

    toggleGender = (index) => {
        if(this.state.gender === index) {
            this.setGender(-1);
        } else {
            this.setGender(index);
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Field label={'Maximum distance'} onChangeText={this.updateDistance} value={this.state.distance} description={'The furthest away you want any member of your community to be'}/>
                <SliderContainer label={'Group size'} value={this.state.size} onValueChange={this.updateSize} description={'Your ideal group size'}/>
                <SelectorContainer value={this.state.gender} toggle={this.toggleGender} label={'Group gender'} description={'The gender distribution of the group'} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    fieldContainer: {
        flex: 1,
        paddingBottom: 15,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkMarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    textInput: {
        borderColor: '#0084A4',
        borderWidth: 1,
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        padding: 10,
    },
    textLabel: {
        fontSize: 16,
    },
    textDescription: {
        fontSize: 12,
        color: '#555555',
    }
});

export default SettingsScreen;

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
