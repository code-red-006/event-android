import {View, Text, Button, Image} from 'react-native';
import React from 'react';
import Events from './Events';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
