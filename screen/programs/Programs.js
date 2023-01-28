import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SinglePrograms from './SinglePrograms';
import GroupePrograms from './GroupePrograms';
import EnrolledPrograms from './EnrolledPrograms';

const Programs = ({navigation, route}) => {
  const {eventId} = route.params;
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{header: () => null}}>
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
