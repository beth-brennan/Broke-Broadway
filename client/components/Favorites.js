import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text, Button, Card, Title, Paragraph, Divider, List, IconButton } from 'react-native-paper';
import { fetchFavoriteShows } from '../store/shows';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false
    }
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.props.loadFavorites(this.props.auth.id);
  }

  handlePress() {
    this.setState({favorite: !this.state.favorite})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <Title>My Favorites</Title>
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
            <Text>You have not marked any shows as favorites!</Text>
            )}
    </ScrollView>
  </SafeAreaView>
  );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    shows: state.shows
  }
}

const mapProps = (dispatch) => {
  return {
    loadFavorites: () => dispatch(fetchFavoriteShows())
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

export default connect(mapState, mapProps)(Favorites);
