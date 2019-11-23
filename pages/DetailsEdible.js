//This is an example code for NavigationDrawer//
import React, {Component} from 'react';
//import react in our code.
import {StyleSheet, View, Button, Text} from 'react-native';
import SliderShow from 'react-native-image-slider-show';
import Imap from '../image/Imap';

export default class DetailsEdible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../image/boletus.png'),
        require('../image/boletus.png'),
        require('../image/boletus.png'),
        require('../image/boletus.png'),
      ],
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
  });
  // Details non-edible
  render() {
    const {goBack} = this.props.navigation;
    const { images } = this.props.navigation.state.params;
    console.log('NAV =>', this.props.navigation.state);
    console.log(images);
    const imagesData = (images !== null) ? images.split(',') : [];

    console.log('IMAP=>', Imap);
    const imagesSource = imagesData.map((item) =>{
      console.log('item =>', item);
      console.log('ITEM =>', Imap[item]);
      return { url: Imap[item]};
    })
    console.log('IS =>', imagesSource);
    return (
      <View style={styles.MainContainer}>
        <View style={{backgroundColor: 'blue', height: 200}}>
          <SliderShow
            dataSource={imagesSource}
          />
        </View>
        <View>
          <Text>{this.props.navigation.state.params.name}</Text>
          <Button title="Go back" onPress={() => goBack()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'flex-start',
  },
});
