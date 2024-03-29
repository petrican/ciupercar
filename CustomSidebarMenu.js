//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, BackHandler} from 'react-native';
import {Icon} from 'react-native-elements';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();

    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: 'add-circle-outline',
        navOptionName: 'Ciuperci comestibile',
        screenToNavigate: 'NavScreen1',
      },
      {
        navOptionThumb: 'remove-circle-outline',
        navOptionName: 'Ciuperci necomestibile',
        screenToNavigate: 'NavScreen2',
      },
      {
        navOptionThumb: 'remove-circle',
        navOptionName: 'Otravitoare',
        screenToNavigate: 'NavScreen3',
      },
      // {
      //   navOptionThumb: 'restaurant',
      //   navOptionName: 'Retete',
      //   screenToNavigate: 'NavScreen4',
      // },
    ];
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <Image
          source={require('./image/boletus.png')}
          style={styles.sideMenuProfileIcon}
        />
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{width: '100%'}}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor:
                  global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <View style={{marginRight: 10, marginLeft: 20}}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color:
                    global.currentScreenIndex === key ? '#313218' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}

          <View
            style={{
              borderBottomColor: '#DDDDDD',
              borderBottomWidth: 1,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: '#ffffff',
            }}
            key="offkey">
            <View style={{marginRight: 10, marginLeft: 20}}>
              <Icon name='md-power' type='ionicon' size={25} color="#808080" />
            </View>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
              }}
              onPress={()  => BackHandler.exitApp()}>
              Inchide aplicatia
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
});
