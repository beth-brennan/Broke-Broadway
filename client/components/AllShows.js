import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllShows } from '../store/shows';
import { Appbar, Text } from 'react-native-paper';

class AllShows extends React.Component {
  componentDidMount() {
    this.props.loadShows();
  }

  render() {
    return (
      <View>
        {this.props.shows ? (
          <Text>Here is where the shows go!</Text>
        ): (
          <Text>There are no shows! Please check back later!</Text>
        )}
    </View>
  );
  }

}

const mapState = (state) => {
  console.log(state);
  return {
    shows: state.shows
  }
}

const mapProps = (dispatch) => {
  return {
    loadShows: () => dispatch(fetchAllShows())
  }
}

const styles = StyleSheet.create({

});

export default connect(mapState, mapProps)(AllShows);
