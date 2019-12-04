import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import {Icon} from 'react-native-elements';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      searchActive: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  toggleSearchBar = () => {
    this.setState({searchActive: !this.state.searchActive, text: ''});
  };

  handleBackPress = () => {
    if (this.state.searchActive) this.toggleSearchBar();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    const searchWidth = screenWidth - 100;

    const SearchBar = (
      <View
        style={{width: searchWidth, height: 50, backgroundColor: '#313218'}}>
        <TextInput
          style={{paddingTop: 18, color: 'white', fontSize: 20}}
          placeholder="Caută ..."
          placeholderTextColor={'white'}
          onChangeText={text => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );

    return (
      <View style={styles.MainContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {this.state.searchActive && SearchBar}
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#313218',
              paddingTop: 15,
            }}>
            <TouchableOpacity onPress={() => this.toggleSearchBar()}>
              <Icon
                name="ios-search"
                type="ionicon"
                color="#94C43D"
                style={{paddingTop: 30, marginTop: 30}}
              />
            </TouchableOpacity>
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
