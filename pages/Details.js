//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Button, Text } from 'react-native';
import SliderShow from 'react-native-image-slider-show';
import Imap from '../image/Imap';
import { ScrollView } from 'react-native-gesture-handler';

export default class Details extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });
  // Details non-edible
  render() {
    const { goBack } = this.props.navigation;
    const { images } = this.props.navigation.state.params;
    const imagesData = (images !== null) ? images.split(',') : [];

    const renderImages = [];
    Object.keys(Imap).map((item) => {
      if (imagesData.includes(item)) renderImages.push({ url: Imap[item] });
    });

    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          <View style={{ backgroundColor: 'blue', height: 200 }}>
            <SliderShow
              dataSource={renderImages}
            />
          </View>
          <View>
            <Text style={{ padding: 20, paddingBottom: 10, fontSize: 18 }}>{this.props.navigation.state.params.name}</Text>
          </View>
          <View>
            <Text style={{ padding: 20, paddingTop: 0, fontSize: 16, color: 'green' }}>{this.props.navigation.state.params.sezon}</Text>
          </View>
          <View>
            <Text style={{ paddingTop: 0, paddingRight: 20, paddingLeft: 20, fontSize: 14 }}>{this.props.navigation.state.params.descriere}</Text>
          </View>
          <View>
            <Text style={{ paddingTop: 0, paddingRight: 20, paddingLeft: 20, fontSize: 14 }}>   </Text>
          </View>
          <View>
            <Button color="#313218" title="Înapoi" onPress={() => goBack()} />
          </View>
        </ScrollView>
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
