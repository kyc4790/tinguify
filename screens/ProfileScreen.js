import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, DatePickerIOS, TextInput } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

const Field = (props) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.textLabel}>
      {props.label}
    </Text>
    <TextInput style={styles.textInput} onChangeText={props.onChangeText} value={props.value} />
  </View>
)

class ProfileScreen extends React.Component {
  state = {
    clicked: false,
    name: '',
    birthday: new Date(),
    interests: '',
  }

  toggleClicked = () => {
    this.setState({
      clicked: !this.state.clicked,
    })
  }

  setName = (e) => {
    this.setState({
      name: e,
    })
  }

  setBirthday = (e) => {
    this.setState({
      birthday: e,
    })
  }

  setInterests = (e) => {
    this.setState({
      interests: e
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/**
         * Go ahead and delete ExpoLinksView and replace it with your content;
         * we just wanted to provide you with some helpful links.
         */}
        <View style={styles.horizontal}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: 'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'}}/>
          </View>
        </View>
        <Field onChangeText={this.setName} value={this.state.name} label={'Name'} />
        <Field onChangeText={this.setInterests} value={this.state.interests} label={'Interests'} long={true} />
        <Text style={styles.textLabel}>
          {'Birthday'}
        </Text>
        <DatePickerIOS date={this.state.birthday} onDateChange={this.setBirthday} mode={'date'} />
      </ScrollView>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  imageContainer: {
    paddingRight: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
  },
  horizontal: {
    flexDirection: 'row',
  },
  fieldContainer: {
    flex: 1,
    paddingBottom: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
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
  }
});
