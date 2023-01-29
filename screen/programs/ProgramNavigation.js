import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SinglePrograms from './programsList/SinglePrograms';
import GroupePrograms from './programsList/GroupePrograms';
import EnrolledPrograms from './programsList/EnrolledPrograms';
import Icon from 'react-native-vector-icons/FontAwesome';

const Programs = ({navigation, route}) => {
  const {eventId} = route.params;
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: () => null,
        tabBarIcon: ({focused, size, color}) => {
          color = focused ? 'blue' : 'black';
          if (route.name === 'single') {
            return <Icon name="user" color={color} style={{fontSize: 25}} />;
          } else if (route.name === 'groupe') {
            return <Icon name="users" color={color} style={{fontSize: 25}} />;
          } else {
            return (
              <Icon name="check-square" color={color} style={{fontSize: 25}} />
            );
          }
        },
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        tabBarStyle: {height: 60, padding: 5},
        tabBarActiveTintColor: '#00f',
      })}>
      <Tab.Screen
        name="single"
        component={SinglePrograms}
        initialParams={{eventId}}
      />
      <Tab.Screen
        name="groupe"
        component={GroupePrograms}
        initialParams={{eventId}}
      />
      <Tab.Screen
        name="enrolled"
        component={EnrolledPrograms}
        initialParams={{eventId}}
      />
    </Tab.Navigator>
  );
};

export default Programs;
