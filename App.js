import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useLoggedIn} from './hooks/useLoggedIn';
import AdminLogin from './screen/AdminLogin';
import Home from './screen/Home';
import Login from './screen/Login';
import ProgramDetails from './screen/programs/ProgramDetails';
import Programs from './screen/programs/Programs';
import Register from './screen/Register';
import Program from './store/ProgramContext';

const App = () => {
  const {isLoggedIn, pending} = useLoggedIn();
  const [loading, setLoading] = useState(true);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (!pending) setLoading(false);
  }, [pending]);

  return (
    <>
      {loading ? (
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Program>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? 'home' : 'login'}>
              <Stack.Screen
                name="home"
                component={Home}
                options={{header: () => null}}
              />
              <Stack.Screen name="programs" component={Programs} />
              <Stack.Screen
                name="programDetails"
                component={ProgramDetails}
                options={({route}) => ({
                  title: route.params.title,
                })}
              />
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
            </Stack.Navigator>
          </NavigationContainer>
        </Program>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default App;
