import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Image, SafeAreaView, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text, Card, IconButton, Paragraph, Button } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

class SingleShow extends React.Component {
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
              right={() => <IconButton icon="star" />}
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
    singleShow: state.singleShow
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

export default connect(mapState)(SingleShow);
