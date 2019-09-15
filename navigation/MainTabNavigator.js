import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
//import LinksScreen from '../screens/LinksScreen';
import StatsScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
  ),
}
// // JAvascript
// Homestack.navigationOptions.tabBarLabel;
// console.log()
// let x = 0;
// const print_hello = (arg1, arg2) => {
//   console.log(arg1, ag2, 'hello');
//   return arg1;
// };
// x  = 1;

// const func = (arg1) => 255-arg1

// // React-NAtive (mobile apps)
// class PascalCase extends React.Component {

//   render() {
//       //this.props
//       return (
//         <View>
//          <Text >Hello world! This is from {this.props.katherine} at {this.props.joanne} PM</Text>
//         </View>
//       )
//   }
// }

// const func_Reac = () => (
//   <PascalCase joanne=3 katherine='enirehtak'/>
// )

// // CSS/Styles
// styles = StyleSheet.create({
//   bodyText: {
//     fontColor: '#0000ff',
//     fontSize: '16px',
//     fontFamily: 'open-sans',
//   }
// })

HomeStack.path = 'Home';

const StatsStack = createStackNavigator(
  {
    Profile: StatsScreen,
  },
  config
);

StatsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

StatsStack.path = 'Profile';

// SETTINGS SCREEN /////////////////////////////////////////

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = 'Settings';

const tabNavigator = createBottomTabNavigator({
  SettingsStack,
  HomeStack,
  StatsStack,
}, {
  initialRouteName: 'HomeStack'
});

tabNavigator.path = '';

export default tabNavigator;
