import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import store from './client/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleShow from './client/components/SingleShow';
import Faq from './client/components/Faq';
import AllShows from './client/components/AllShows';
import Favorites from './client/components/Favorites';
import Account from './client/components/Account';
import { StartScreen, LoginScreen, RegisterScreen, ResetPasswordScreen } from './client/components/Home/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const ShowStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#52154e',
    secondary: '#111344',
    tertiary: '#F9CFF2'
  },
};

function Shows() {
  return (
    <ShowStack.Navigator
    initialRouteName="All Shows"
    screenOptions={{
      headerShown: false,
    }}>
      <ShowStack.Screen name="All Shows" component={AllShows} />
      <ShowStack.Screen name="Single Show" component={SingleShow} />
    </ShowStack.Navigator>
  )
}

function Content() {
  return (
    <Tab.Navigator
      initialRouteName="Shows"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Shows') {
            iconName = focused ? 'ticket' : 'ticket';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'star' : 'star-o';
          } else if (route.name === 'Frequently Asked Questions') {
            iconName = focused ? 'question-circle' : 'question-circle-o';
          } else if (route.name === 'Account') {
            iconName = focused ? 'user' : 'user-o';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#52154e',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}>
      <Tab.Screen name="Shows" component={Shows} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Frequently Asked Questions" component={Faq} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <StoreProvider store={ store } >
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="Content" component={Content} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

