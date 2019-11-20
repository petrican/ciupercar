//This is an example code for NavigationDrawer//
import React, {Component} from 'react';
//import react in our code.
import {FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

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
        "SELECT * FROM ciuperci WHERE categorie='2'",
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
            <TouchableOpacity key={item.id} onPress={() => navigate('DetailsNonEdible', {name: item.denumire})} >
            <View
              key={item.id}
              style={{
                backgroundColor: '#B51300',
                padding: 20,
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: '#d6d7da',
              }}>
              <Text>Id: {item.id}</Text>
              <Text>Denumire: {item.denumire}</Text>
            </View>
            </TouchableOpacity>
          )}
        />
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
