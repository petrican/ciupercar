//This is an example code for NavigationDrawer//
import React, {Component} from 'react';
//import react in our code.
import {FlatList, StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Imap from '../image/Imap';
import { connect } from "react-redux";

// Connection to access the pre-populated ciupercar.db
var db = openDatabase({name: 'ciupercar.db', createFromLocation: 1});

export class Edible extends Component {
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
    // console.log(store.getState());
    console.log('Props =>', this.props);

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
    backgroundColor: '#769743',
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
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


const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  null
)(Edible);