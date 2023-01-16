import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Events from './Events';

const Home = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Events" component={Events} />
    </Drawer.Navigator>
  );
};

export default Home;
