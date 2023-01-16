import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {BaseUrl} from '../constents';

export const useLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pending, setPending] = useState(true);
  const url = `${BaseUrl}/verify`;
  useEffect(() => {
    const check = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get(url, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setIsLoggedIn(true);
        setPending(false);
      } catch (error) {
        setPending(false);
      }
    };
    check();
  });

  return {isLoggedIn, pending};
};
