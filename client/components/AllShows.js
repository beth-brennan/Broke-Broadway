import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllShows } from '../store/shows';
import { Appbar, Text, Button, Card, Title, Paragraph, Divider, List, IconButton } from 'react-native-paper';

class AllShows extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false
    }
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.props.loadShows();
  }

  handlePress() {
    this.setState({favorite: !this.state.favorite})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {this.props.shows ? (
            this.props.shows.map(show => {
              return (
                <Card key={show.id} style={styles.card} mode='outlined'>
                  <Card.Cover source={{uri: show.image}} />
                  <Card.Title
                  title={show.name}
                  subtitle={show.type}
                  right={() => <IconButton icon={this.state.favorite ? "star" : "star-outline"} onPress={this.handlePress} />}
                    />
                  <Card.Actions>
                    <Button>View Ticket Options</Button>
                  </Card.Actions>
                </Card>
            )})
            ): (
              <Text>There are no shows! Please check back later!</Text>
              )}
      </ScrollView>
    </SafeAreaView>
  );
  }

}

const mapState = (state) => {
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
  container: {
    width: '100%',
    height: '100%'
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default connect(mapState, mapProps)(AllShows);
