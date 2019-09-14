import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

class StatsScreen extends React.Component {
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
          <Text style={this.state.clicked ? styles.titleClicked: styles.titleUnclicked} onClick={this.toggleClicked}> Hello world! </Text>
        </View>
      </ScrollView>
    );
  }
}

StatsScreen.navigationOptions = {
  title: 'Stats',
};

export default StatsScreen;

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
