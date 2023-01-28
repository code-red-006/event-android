import {View, Text, Button, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Events from './Events';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import {useLoggedIn} from '../hooks/useLoggedIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgramContext } from '../store/ProgramContext';

const Tab = createBottomTabNavigator();

const Home = () => {
  const {data, pending} = useLoggedIn();
  const {setUser} = useContext(ProgramContext)
  useEffect(() => {
    const check = async () => {
      if (!pending) {
        await AsyncStorage.setItem('userId', data.id);
        setUser(data.id);
      }
    };
    check();
  }, [pending]);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
