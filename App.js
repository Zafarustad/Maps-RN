import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Components/Home';
import Map from './Components/Map';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
