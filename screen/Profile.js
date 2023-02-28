import {View, Text, Pressable} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useLoggedIn} from '../hooks/useLoggedIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProgramContext} from '../store/ProgramContext';

const Profile = ({navigation}) => {
  const {data, pending} = useLoggedIn();
  const {setHouse, setAdmNo, setUser} = useContext(ProgramContext);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setAdmNo(null)
      setHouse(null)
      setUser(null)
      navigation.replace('login');
    } catch (error) {}
  };

  return (
    <View>
      {data && <Text>{data.username}</Text>}
      <Pressable onPress={logOut}>
        <Text>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
