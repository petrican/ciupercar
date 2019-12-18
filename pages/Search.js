import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import { setSearchString } from "../actions/search";

export class Search extends Component {
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
    this.updateSearchInput('');
  };

  handleBackPress = () => {
    if (this.state.searchActive) {
      this.toggleSearchBar();
    }  
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  updateSearchInput = (text) => {
    this.props.setSearchString(text);
    this.setState({text})
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
          onChangeText={text => this.updateSearchInput(text)}
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
    marginTop: 5,
    justifyContent: 'center',
  },
});


const mapStateToProps = state => ({
  search: state.search
});

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    setSearchString: (search) => dispatch(setSearchString(search)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);