import {View, Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useLoggedIn} from '../hooks/useLoggedIn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {data, pending} = useLoggedIn();

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
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
