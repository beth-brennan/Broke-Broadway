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

const Stack = createNativeStackNavigator();

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

export default function App() {
  return (
    <StoreProvider store={ store } >
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="Frequently Asked Questions" component={Faq} />
            <Stack.Screen name="All Shows" component={AllShows} />
            <Stack.Screen name="Single Show" component={SingleShow} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Account" component={Account} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

