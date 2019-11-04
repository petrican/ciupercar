
//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
// Connection to access the pre-populated ciupercar.db
var db = openDatabase({ name: 'ciupercar.db', createFromLocation: 1 });

export default class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM ciuperci categorie=\'1\'', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };

  //Screen1 Component
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={{ backgroundColor: 'green', padding: 20, borderRadius: 4, borderWidth: 0.5, borderColor:  '#d6d7da' }}>
            <Image source={require(`./image/${item.short}/${item.thumb}.jpg`)} style={{ width: 25, height: 25, marginLeft: 5 }}  />
              <Text>Id: {item.id}</Text>
              <Text>Denumire: {item.denumire}</Text>
            </View>
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