import {View, Text} from 'react-native';
import React from 'react';
import Program from './store/ProgramContext';
import MainNavigation from './MainNavigation';

const App = () => {
  return (
    <Program>
      <MainNavigation />
    </Program>
  );
};

export default App;
