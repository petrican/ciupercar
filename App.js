//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
//import react in our code.
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
// import all basic components
 
//For React Navigation 3+
//import {
//  createStackNavigator,
//  createDrawerNavigator,
//  createAppContainer,
//} from 'react-navigation';
 
//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

//Import all the screens
import Edible from './pages/Edible';
import NonEdible from './pages/NonEdible';
import Screen3 from './pages/Screen3';
import DetailsNonEdible from './pages/DetailsNonEdible';
import DetailsEdible from './pages/DetailsEdible'; 
import Search from './pages/Search';


//Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';
 
global.currentScreenIndex = 0;
//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./image/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
 
//Stack Navigator for the First Option of Navigation Drawer
const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  First: {
    screen: Edible,
    navigationOptions: ({ navigation }) => ({
      title: 'Ciuperci comestibile',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <Search />,
      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  },
  DetailsEdible: {
    screen: DetailsEdible,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  }
});
 
//Stack Navigator for the Second Option of Navigation Drawer
const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  NonEdible: {
    screen: NonEdible,
    navigationOptions: ({ navigation }) => ({
      title: 'Ciuperci necomestibile',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
 
      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  },
  DetailsNonEdible: {
    screen: DetailsNonEdible,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  }
});
 
//Stack Navigator for the Third Option of Navigation Drawer
const Screen3_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Third: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'Retete',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  },
});


//Drawer Navigator Which will provide the structure of our App
const DrawerNavigatorExample = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavScreen1: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Ciuperci comestibile',
      },
    },
    NavScreen2: {
      screen: Screen2_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Ciuperci necomestibile',
      },
    },
    NavScreen3: {
      screen: Screen3_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Retete',
      },
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
  }
);
export default createAppContainer(DrawerNavigatorExample);