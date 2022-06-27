import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text, Button, Card, Title, Paragraph, Divider, List, IconButton } from 'react-native-paper';
import { deleteFavorite, fetchFavoriteShows } from '../store/favorites';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    }
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
      this.props.loadFavorites(1);
      this.setState({ favorites: this.props.favorites });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favorites.length != this.props.favorites.length) {
      this.props.loadFavorites(1);
      this.setState({ favorites: this.props.favorites });
    }
  }

  handlePress(showId) {
    this.props.deleteFavorite(1, showId);
    this.setState({ favorites: this.props.favorites });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Favorites" />
        </Appbar.Header>
      <ScrollView>
        {this.state.favorites ? (
          this.state.favorites.map(show => {
            return (
              <Card key={show.id} style={styles.card} mode='outlined'>
                <Card.Cover source={{uri: show.image}} />
                <Card.Title
                title={show.name}
                subtitle={show.type}
                right={() => <IconButton icon={this.state.favorites.includes(show) ? "star" : "star-outline"} onPress={() => this.handlePress(show.id)} />}
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
    favorites: state.favorites,
    isLoggedIn: !!state.auth.id,
  }
}

const mapProps = (dispatch) => {
  return {
    loadFavorites: (id) => dispatch(fetchFavoriteShows(id)),
    deleteFavorite: (userId, showId) => dispatch(deleteFavorite(userId, showId))
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
