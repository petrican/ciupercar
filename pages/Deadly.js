//This is an example code for NavigationDrawer//
import React, {Component} from 'react';
//import react in our code.
import {FlatList, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Imap from '../image/Imap';

// Connection to access the pre-populated ciupercar.db
var db = openDatabase({name: 'ciupercar.db', createFromLocation: 1});

export default class NonEdible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM ciuperci WHERE categorie='3'",
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
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  // Non-edible mushrooms
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity key={item.id} onPress={() => navigate('Details', {name: item.denumire, images: item.images})} >
            <View key={item.id} style={styles.boxCiuperca}>
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
  boxCiuperca: {
    backgroundColor: '#E61A23',
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#E61A23',
    flexDirection: 'row',
  },
  sectionRight: {
    flexDirection: 'column',
    marginLeft: 20
  },
  textLabel: {
    marginTop: 15,
    color: '#000000',
  },
});
