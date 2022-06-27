import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllShows } from '../store/shows';
import { Appbar, Text, Button, Card, Title, Paragraph, Divider, List, IconButton, ToggleButton } from 'react-native-paper';
import { fetchOneShow } from '../store/singleShow';
import { deleteFavorite, fetchFavoriteShows, setFavorite } from '../store/favorites';

class AllShows extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      // shows: [],
      // filter: "All"
    }
    this.handlePress = this.handlePress.bind(this);
    this.handleChangeScreens = this.handleChangeScreens.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.props.loadShows();
    this.props.loadFavorites(1);
    this.setState({ shows: this.props.shows });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favorites.length != this.props.favorites.length) {
      this.props.loadFavorites(1);
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

  handleChangeScreens(id) {
    this.props.loadSingleShow(id);
    this.props.navigation.navigate('Single Show')
  }

  // handleChange(filter) {
  //   this.setState({filter});
  // }

  // handleFilter() {
  //   const today = new Date();
  //   const closingSoonDate = new Date()+14;
  //   if (this.state.filter === "All") {
  //     this.setState({ shows: this.props.shows });
  //   } else if (this.state.filter === "Current") {
  //     const currentShows = this.props.shows.filter(show => show.open_date <= today);
  //     this.setState({ shows: currentShows });
  //   } else if (this.state.filter === "Upcoming") {
  //     const upcomingShows = this.props.shows.filter(show => show.open_date > today);
  //     this.setState({ shows: upcomingShows });
  //   } else if (this.state.filter === "Closing Soon") {
  //     const closingSoon = this.props.shows.filter(show => show.close_date < closingSoonDate);
  //     this.setState({ shows: closingSoon });
  //   }
  // }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Broadway for Broke People" />
        </Appbar.Header>
        {/* <ToggleButton.Row onValueChange={() => this.handleFilter()} value={this.state.filter}>
        <ToggleButton value="All" onPress={() => this.handleChange("All")}>All</ToggleButton>
          <ToggleButton value="Current" onPress={() => this.handleChange("Current")}>Current</ToggleButton>
          <ToggleButton value="Upcoming"  onPress={() => this.handleChange("Upcoming")}>Upcoming</ToggleButton>
          <ToggleButton value="Closing Soon" onPress={() => this.handleChange("Closing Soon")}>Closing Soon</ToggleButton>
        </ToggleButton.Row> */}
        <ScrollView>
          {this.props.shows ? (
            this.props.shows.map(show => {
              return (
                <Card key={show.id} mode='outlined'>
                  <Card.Cover source={{uri: show.image}} />
                  <Card.Title
                  title={show.name}
                  subtitle={show.type}
                  right={() => <IconButton
                      icon={this.state.favorites.filter(fav => fav.id === show.id).length > 0 ? "star" : "star-outline"} onPress={() => this.handlePress(show)} />}
                    />
                  <Card.Actions>
                    <Button onPress={() => this.handleChangeScreens(show.id)}>View Ticket Options</Button>
                  </Card.Actions>
                </Card>
            )})
            ): (
              <Paragraph style={styles.paragraph}>There are no shows! Please check back later!</Paragraph>
              )}
      </ScrollView>
    </SafeAreaView>
  );
  }

}

const mapState = (state) => {
  return {
    shows: state.shows,
    singleShow: state.singleShow,
    auth: state.auth,
    favorites: state.favorites
  }
}

const mapProps = (dispatch) => {
  return {
    loadShows: () => dispatch(fetchAllShows()),
    loadSingleShow: (id) => dispatch(fetchOneShow(id)),
    loadFavorites: (id) => dispatch(fetchFavoriteShows(id)),
    deleteFavorite: (userId, showId) => dispatch(deleteFavorite(userId, showId)),
    setFavorite: (userId, showId) => dispatch(setFavorite(userId, showId))
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  paragraph: {
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    fontSize: 18
  },
});

export default connect(mapState, mapProps)(AllShows);
