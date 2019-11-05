//This is an example code for NavigationDrawer//
import React, {Component} from 'react';
//import react in our code.
import {FlatList, StyleSheet, View, Text, Image} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
// Connection to access the pre-populated ciupercar.db
var db = openDatabase({name: 'ciupercar.db', createFromLocation: 1});

export default class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM ciuperci WHERE categorie='1'",
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

  //Screen1 Component
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              key={item.id}
              style={styles.boxCiuperca}>
              <View>
                <Image
                  source={require('../image/boletus.png')}
                  style={{width: 50, height: 50, marginLeft: 5}}
                />
              </View>
              <Text style={styles.textLabel}>Id: {item.id}</Text>
              <Text style={styles.textLabel}>Denumire: {item.denumire}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxCiuperca: {
    backgroundColor: '#769743',
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  textLabel: {
    color: '#000000'
  }
});
