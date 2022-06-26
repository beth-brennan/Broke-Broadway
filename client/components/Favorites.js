import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text } from 'react-native-paper';

class Favorites extends React.Component {
  render() {
    return (
      <Text>This is the favorites page!</Text>
  );
  }

}

const styles = StyleSheet.create({

});

export default connect(null)(Favorites);
