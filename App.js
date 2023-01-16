import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, StyleSheet} from 'react-native';
import AdminLogin from './screen/AdminLogin';
import Home from './screen/Home';
import Login from './screen/Login';
import Register from './screen/Register';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="adminLogin"
          component={AdminLogin}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
