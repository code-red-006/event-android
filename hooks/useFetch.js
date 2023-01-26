import {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFetch = (url, name, navigation) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) navigation.navigate('login');
        const res = await axios.get(url, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setData(res.data[name]);
        setPending(false);
      } catch (error) {
        console.log(error.response.data);
        setPending(false);
      }
    };
    fetchData();
  }, []);
  return {data, pending};
};
