//This is an example code for NavigationDrawer//
import React, {Component} from 'react';
//import react in our code.
import {StyleSheet, View, Button} from 'react-native';
// import all basic components

export default class Screen4 extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
  });
  //Screen4 Component
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.MainContainer}>
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
