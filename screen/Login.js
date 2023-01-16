import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl} from '../constents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoggedIn, useToken} from '../hooks/useLoggedIn';

const Login = ({navigation}) => {
  const [admNumber, setAdmNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const {isLoggedIn, pending} = useLoggedIn();

  useEffect(() => {
    if (!pending) {
      if (isLoggedIn) {
        navigation.navigate('home');
      } else {
        setLoading(false);
      }
    }
  }, [pending]);

  const submitHandler = async () => {
    setError(null);
    if (admNumber === '' || password === '')
      return Alert.alert(null, 'input must not be empty');
    if (password.length < 8)
      return Alert.alert(null, 'Password must be minimum 8 characters');

    const data = {
      adm_no: admNumber,
      password: password,
    };
    const url = `${BaseUrl}/login`;
    try {
      const res = await axios.post(url, data);
      await AsyncStorage.setItem('token', res.data.token);
      navigation.replace('home');
    } catch (error) {
      setError(error.response.data.error.msg);
    }
  };

  const registerBtnHandler = () => {
    navigation.replace('register');
  };

  return (
    <View style={styles.body}>
      {loading ? (
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Event Organizer</Text>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Login</Text>
            <View style={styles.inputView}>
              <TextInput
                value={admNumber}
                style={styles.inputText}
                onChangeText={value => setAdmNumber(value)}
                placeholder="Admission Number"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={password}
                style={styles.inputText}
                onChangeText={value => setPassword(value)}
                placeholder="Password"
                secureTextEntry
              />
            </View>
            <Pressable
              onPress={submitHandler}
              style={styles.submitBtn}
              android_ripple={{color: '#ffffff98'}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Submit</Text>
            </Pressable>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
          <Pressable onPress={registerBtnHandler} style={styles.registerBtn}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              Register
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#000',
    fontSize: 40,
    fontFamily: 'Playball-Regular',
  },
  formTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowRadius: 1000,
    elevation: 2,
    width: '80%',
    alignItems: 'center',
  },
  inputView: {
    flexDirection: 'row',
    margin: 5,
  },
  inputText: {
    backgroundColor: '#fff',
    borderColor: '#00000070',
    borderWidth: 1.5,
    borderRadius: 5,
    width: 50,
    flex: 1,
    fontSize: 18,
    padding: 10,
  },
  submitBtn: {
    backgroundColor: '#000',
    padding: 10,
    color: '#fff',
    borderRadius: 5,
    margin: 10,
  },
  error: {
    margin: 10,
    color: '#f00',
    fontWeight: 'bold',
  },
  registerBtn: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    borderTopStartRadius: 7,
    borderTopEndRadius: 7,
    justifyContent: 'center',
  },
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

export default Login;
