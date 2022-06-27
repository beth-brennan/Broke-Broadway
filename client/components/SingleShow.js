import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Image, SafeAreaView, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text, Card, IconButton, Paragraph, Button } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { deleteFavorite, setFavorite } from '../store/favorites';

class SingleShow extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    }
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.setState({ favorites: this.props.favorites });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favorites.length != this.props.favorites.length) {
      this.setState({ favorites: this.props.favorites });
    }
  }

  handlePress(show) {
    if (this.state.favorites.filter(fav => fav.id === show.id).length > 0) {
      this.props.deleteFavorite(1, show.id);
      this.setState({ favorites: this.props.favorites });
    } else {
      this.props.setFavorite(1, show.id);
      this.setState({ favorites: this.props.favorites });
    }
  }

  render() {
    const show = this.props.singleShow;
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.props.navigation.goBack}/>
        </Appbar.Header>
        <ScrollView>
        <Card mode='outlined'>
          <Card.Cover source={{uri: show.image}} />
            <Card.Title
              title={show.name}
              subtitle={show.type}
              right={() => <IconButton
                icon={this.state.favorites.filter(fav => fav.id === show.id).length > 0 ? "star" : "star-outline"} onPress={() => this.handlePress(show)} />}
            />
            <Card.Content>
              <Paragraph style={styles.theater}>{show.theater}</Paragraph>
              <Paragraph style={styles.address}>{show.address1}</Paragraph>
              <Paragraph style={styles.address}>{show.address2}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => WebBrowser.openBrowserAsync(show.website)}>Visit site</Button>
            </Card.Actions>
          </Card>
          {show.ticketoptions && show.ticketoptions.length > 0 ? (
            show.ticketoptions.map(option => {
              return (
                <Card mode='outlined' key={option.id} style={styles.card}>
                  <Card.Title title={`${option.type}: $${option.price}`} />
                  <Card.Content>
                    <Paragraph>{option.restrictions}</Paragraph>
                  </Card.Content>
                  {option.link ? (
                    <Card.Actions>
                      <Button onPress={() => WebBrowser.openBrowserAsync(option.link)}>Click to Enter</Button>
                    </Card.Actions>
                  ) : (<Button></Button>)}
                </Card>)
            })
          ) : (
            <Paragraph style={styles.paragraph}>Unfortunately, there are no rush, lottery, or SRO policies currently announced for this show. Please check back later!
            </Paragraph>
          )}
        </ScrollView>
      </SafeAreaView>
  );
  }

}

const mapState = (state) => {
  return {
    singleShow: state.singleShow,
    auth: state.auth,
    favorites: state.favorites
  }
}

const mapProps = (dispatch) => {
  return {
    deleteFavorite: (userId, showId) => dispatch(deleteFavorite(userId, showId)),
    setFavorite: (userId, showId) => dispatch(setFavorite(userId, showId))
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  theater: {
    fontWeight: 'bold'
  },
  address: {
    fontStyle: 'italic'
  },
  card: {
    backgroundColor: '#D8D6D8'
  },
  paragraph: {
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    fontSize: 18
  },
});

export default connect(mapState, mapProps)(SingleShow);
