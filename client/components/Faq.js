import * as React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, BottomNavigation, Text, Appbar } from 'react-native-paper';
import AllShows from "./AllShows";
import Favorites from "./Favorites";
import Account from "./Account";

export default function Faq({ navigation }) {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Frequently Asked Questions" />
      </Appbar.Header>
      <ScrollView>
        <List.AccordionGroup>
          <List.Accordion title="What is a rush ticket?" id="1">
            <Text style={styles.text}>
              A rush ticket is a steeply discounted ticket for a Broadway show that can only be purchased the day of the performance. The idea began with RENT, which, at the peak of its popularity, sold the first two rows of the orchestra for $20 to whomever got to the box office in time. Nowadays, there are both in-person and digital lotteries.
              Because of the demand for discounted Broadway seats, anyone who wants to take advantage of the in-person tickets generally has to get to the theater before the box office even opens. How early you need to get there depends on the popularity of the show, weather, day of the week, how soon it's closing or a star is leaving, and many other factors. Digital rush tickets are usually gone within seconds after they are put on sale. Generally, rush tickets are limited to 2 per person. Check individual shows for their specific policies.
            </Text>
          </List.Accordion>
          <List.Accordion title="What is a lottery ticket?" id="2">
            <Text style={styles.text}>
              A lottery ticket is a steeply discounted ticket awarded through a lottery system. There are both digital and in-person lotteries. Digital lotteries allow you to enter on an app or website during a certain window of time, and then will inform winners by text or email and provide them with instructions to purchase the tickets. In-person lotteries usually require you to arrive at the theater at a certain time for a drawing and if you win, you purchase the tickets right then. Generally, lottery tickets are limited to 2 per person. Check individual shows for their specific policies.
            </Text>
          </List.Accordion>
          <List.Accordion title="What is standing room only?" id="3">
            <Text style={styles.text}>
              Standing Room Only tickets are exactly what they sound like - tickets that allow you to stand in a designated spot, generally at the back of the orchestra. Depending on the show, they can be purchased through either a rush or a lottery. Check individual shows for their specific policies.
            </Text>
          </List.Accordion>
          <List.Accordion title="Where else can I find cheap theater tickets?" id="4">
            <Text style={styles.text}>
              There are definitely other options and services out there for inexpensive theater tickets! Many times discounts or comp offers are sent to specific email lists, such as for universities or professional organizations. Theater Development Fund offers memberships to students, teachers, young people, seniors, non-profit or arts workers, and more. There are also private seat filling organizations. We encourage you to take advantage of these offers if you're able!
            </Text>
          </List.Accordion>
          <List.Accordion title="Why don't you list discount codes/comp offers/TDF offers?" id="5">
            <Text style={styles.text}>
              This app is meant to provide information about publicly available affordable ticket options. Discounts and comp offers are usually meant for a specific group and it would be a disservice to the shows to advertise them beyond the persons they were meant for.
            </Text>
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  text: {
    color: 'black',
    fontSize: 14,
    margin: 20
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }

});
