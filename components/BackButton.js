import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

const BackButton = props => {
  return (
    <View style={styles.ButtonContainer}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon name={props.icon} size={props.size} color={props.color} />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  ButtonContainer: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
});
