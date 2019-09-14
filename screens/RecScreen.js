import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

class RecScreen extends React.Component {
  state = {
    clicked: false,
    bogus: true,
  }

  toggleClicked = () => {
    this.setState({
      clicked: !this.state.clicked,
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/**
         * Go ahead and delete ExpoLinksView and replace it with your content;
         * we just wanted to provide you with some helpful links.
         */}
        <View style={styles.titleContainer}>
            <Text>
                ?????
            </Text>
        </View>
      </ScrollView>
    );
  }
}

RecScreen.navigationOptions = {
  title: 'Recommendations',
};

export default RecScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flex:1,
    padding: 15,
    margin: 30,
    backgroundColor: '#dadada',
  },
  titleClicked: {
    color: '#12daff',
    fontSize: 16,
  },
  titleUnclicked: {
    color: '#dadada',
    fontSize: 16,
  }
});
