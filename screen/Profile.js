import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import {useLoggedIn} from '../hooks/useLoggedIn';

const Profile = () => {
  const {data, pending} = useLoggedIn();

  useEffect(() => {
    if (!pending) {
      console.log(data);
    }
  }, [pending]);
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
