import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text } from 'react-native-paper';

class Account extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the account page!</Text>
      </View>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
});

export default connect(null)(Account);
