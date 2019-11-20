//This is an example code for NavigationDrawer//
import React, {Component} from 'react';
//import react in our code.
import {StyleSheet, View, Button, Text} from 'react-native';
// import all basic components

export default class DetailsNonEdible extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
  });
  // Details non-edible
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.MainContainer}>
        <Text>{this.props.navigation.state.params.name}</Text>
        <Button title="Go back" onPress={() => goBack()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});
