import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Register/Register';
import Login from '../screens/Login/login';
import NavTab from './NavTab';
import homeScreen from '../screens/HomeScreen/homeScreen';
// import newPost from '../screens/newPost/newPost';
import nuevoPosteo from '../screens/nuevoPosteo/nuevoPosteo';

const Stack = createNativeStackNavigator();

class StackPrincipal extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={homeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Nuevo Posteo" component={nuevoPosteo} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StackPrincipal;
