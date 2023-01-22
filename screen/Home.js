import {View, Text, Button, Image} from 'react-native';
import React from 'react';
import Events from './Events';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const Home = () => {
  let temp = 'hi';
  return (
    <Tab.Navigator>
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="programs" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
