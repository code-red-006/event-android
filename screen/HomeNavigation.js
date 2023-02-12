import {View, Text, Button, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Events from './Events';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import {useLoggedIn} from '../hooks/useLoggedIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProgramContext} from '../store/ProgramContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {default as Ev} from 'react-native-vector-icons/EvilIcons';

const Tab = createBottomTabNavigator();

const Home = () => {
  const {data, pending} = useLoggedIn();
  const {setUser, setAdmNo} = useContext(ProgramContext);
  useEffect(() => {
    const check = async () => {
      if (!pending) {
        await AsyncStorage.setItem('userId', data.id);
        setUser(data.id);
        setAdmNo(data.admNo);
        console.log(data.admNo);
      }
    };
    check();
  }, [pending]);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          color = focused ? 'blue' : 'black';
          if (route.name === 'Events') {
            return <Icon name="event" color={color} style={{fontSize: 30}} />;
          } else if (route.name === 'profile') {
            return <Ev name="user" color={color} style={{fontSize: 40}} />;
          }
        },
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        tabBarStyle: {height: 60},
        tabBarActiveTintColor: '#00f',
      })}>
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
