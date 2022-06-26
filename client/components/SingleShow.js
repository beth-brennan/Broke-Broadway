import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Image, SafeAreaView, TouchableHighlight, Alert, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllShows } from '../store/shows';
import { fetchOneShow } from '../store/singleShow';
import { Appbar, Text } from 'react-native-paper';

class SingleShow extends React.Component {
  componentDidMount() {
    this.props.loadShows();
  }

  render() {
    const show = this.props.shows[0];
    return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Broke Broadway" />
      </Appbar.Header>
      <SafeAreaView style={styles.body}>
        <Image
          style={styles.image}
          source={{ uri: 'https://www.broadway.org/logos/shows/aladdin_poster-july-2021.jpg' }}
        />
        <Text variant="headlineLarge">Aladdin</Text>
        <Text variant="titleMedium">New Amsterdam</Text>
        <Text variant="titleSmall">214 W. 42nd St</Text>
        <Text variant="titleSmall">between 7th and 8th</Text>
      </SafeAreaView>
      <Appbar style={styles.bottom}>
        <Appbar.Action
        icon="archive"
        onPress={() => console.log('Pressed archive')}
        />
        <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
        <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
        <Appbar.Action
          icon="delete"
          onPress={() => console.log('Pressed delete')}
        />
      </Appbar>
    </ScrollView>
  );
  }

}





// function SingleShow(props) {
//   useEffect(() => {
//     props.loadShows();
//   });

//   const show = props.show[0];
//   return (
//     <ScrollView>
//       <Appbar.Header>
//         <Appbar.BackAction />
//         <Appbar.Content title="Broke Broadway" />
//       </Appbar.Header>
//       <SafeAreaView style={styles.body}>
//         <Image
//           style={styles.image}
//           source={{ uri: 'https://www.broadway.org/logos/shows/aladdin_poster-july-2021.jpg' }}
//         />
//         <Text variant="headlineLarge">Aladdin</Text>
//         <Text variant="titleMedium">New Amsterdam</Text>
//         <Text variant="titleSmall">214 W. 42nd St</Text>
//         <Text variant="titleSmall">between 7th and 8th</Text>
//       </SafeAreaView>
//       <Appbar style={styles.bottom}>
//         <Appbar.Action
//         icon="archive"
//         onPress={() => console.log('Pressed archive')}
//         />
//         <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
//         <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
//         <Appbar.Action
//           icon="delete"
//           onPress={() => console.log('Pressed delete')}
//         />
//       </Appbar>
//     </ScrollView>
//   );
// }

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
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  body: {
    paddingTop: 50,
    paddingBottom: 50,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 10
  },
  image: {
    width: 200,
    height: 200
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default connect(mapState, mapProps)(SingleShow);
