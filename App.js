import React, {Component} from 'react';
//import react in our code.
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  Text,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

//Import all the screens
import Edible from './pages/Edible';
import NonEdible from './pages/NonEdible';
import Deadly from './pages/Deadly';
import Retete from './pages/Retete';
import Details from './pages/Details';
import Search from './pages/Search';
import BackButton from './components/BackButton';
import {Provider, connect} from 'react-redux';
import store from './store/store';

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
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./image/drawer.png')}
            style={{width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// let EdibleContainer = connect(state => ({ search: state.search }), null)(Edible);

//Stack Navigator for the First Option of Navigation Drawer
const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  First: {
    screen: Edible,
    navigationOptions: ({navigation}) => ({
      title: 'Ciuperci comestibile',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <Search />,
      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  },
  Details: {
    screen: Details,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.name,
      // headerRight: <NavigationDrawerStructure navigationProps={navigation} />,
      headerLeft: () => (
        <BackButton
          icon="arrow-back"
          size={30}
          color="white"
          navigation={navigation}
        />
      ),
      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for the Second Option of Navigation Drawer
const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  NonEdible: {
    screen: NonEdible,
    navigationOptions: ({navigation}) => ({
      title: 'Ciuperci necomestibile',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  },
  Details: {
    screen: Details,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.name,
      headerRight: <NavigationDrawerStructure navigationProps={navigation} />,
      headerLeft: () => (
        <BackButton
          icon="arrow-back"
          size={30}
          color="white"
          navigation={navigation}
        />
      ),
      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  },
});

//
const Deadly_StackNavigator = createStackNavigator({
  Deadly: {
    screen: Deadly,
    navigationOptions: ({navigation}) => ({
      title: 'Otravitoare',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#313218',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for the Third Option of Navigation Drawer
const Retete_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Retete: {
    screen: Retete,
    navigationOptions: ({navigation}) => ({
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
      screen: Deadly_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Deadly',
      },
    },
    NavScreen4: {
      screen: Retete_StackNavigator,
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
  },
);

let Navigation = createAppContainer(DrawerNavigatorExample);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
