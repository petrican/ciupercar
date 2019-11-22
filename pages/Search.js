import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 250, height: 50, backgroundColor: '#313218'}}>
            <TextInput
              style={{paddingTop: 18, color: 'white' }}
              placeholder="Caută ..."
              placeholderTextColor={'white'} 
              onChangeText={text => this.setState({text})}
              value={this.state.text}
            />
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'steelblue',
              paddingTop: 15,
            }}>
            <Icon
              name="ios-search"
              type="ionicon"
              color="#94C43D"
              style={{paddingTop: 30, marginTop: 30}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingRight: 15,
    marginTop: 0,
    justifyContent: 'center',
  },
});
