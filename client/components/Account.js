import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text } from 'react-native-paper';

class Account extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Account" />
        </Appbar.Header>
        <Text>This is the account page!</Text>
      </SafeAreaView>
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
