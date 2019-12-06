import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Imap from '../image/Imap';
import {connect} from 'react-redux';

// Connection to access the pre-populated ciupercar.db
var db = openDatabase({name: 'ciupercar.db', createFromLocation: 1});

export class MushroomItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    this.dbLookup('');
  }

  dbLookup = srcString => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM ciuperci WHERE categorie='" +
          this.props.cat +
          "' AND denumire like '%" +
          srcString +
          "%'",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          this.setState({
            FlatListItems: temp,
          });
        },
      );
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      this.dbLookup(nextProps.search.lookup);
    }
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: 'white'}} />
    );
  };

  //Screen1 Component
  render() {
    const boxCiuperca = {
      backgroundColor: this.props.backgroundColor,
      padding: 20,
      borderWidth: 0.5,
      borderColor: this.props.backgroundColor,
      flexDirection: 'row',
    }
    const {navigate} = this.props.navigation;

    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigate('Details', {name: item.denumire, images: item.images})
              }>
              <View key={item.id} style={boxCiuperca}>
                <View>
                  <Image
                    source={Imap[item.thumb]}
                    style={{width: 50, height: 50, marginLeft: 5}}
                  />
                </View>
                <View style={styles.sectionRight}>
                  <Text style={styles.textLabel}>{item.denumire}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionRight: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  textLabel: {
    marginTop: 15,
    color: '#000000',
  },
});

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps, null)(MushroomItem);
