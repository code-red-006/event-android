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
import {BaseUrl} from '../../constents';

const Register = ({navigation}) => {
  const [adm_no, setAdmNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const submitHandler = async () => {
    setError(null);
    if (
      adm_no === '' ||
      password === '' ||
      name === '' ||
      year === '' ||
      department === '' ||
      mobile === ''
    )
      return Alert.alert(null, 'input must not be empty');
    if (password.length < 8)
      return Alert.alert(null, 'Password must be minimum 8 characters');
    if (mobile.length < 10)
      return Alert.alert(null, 'mobile number must be minimum 10');

    const data = {
      adm_no,
      password,
      name,
      year,
      department,
      mobile,
    };
    const url = `${BaseUrl}/register`;
    try {
      const res = await axios.post(url, data);
      navigation.replace('login');
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.error.msg);
    }
  };

  const loginBtnHandler = () => {
    setLoading(true)
    navigation.replace('login');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

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
            <Text style={styles.formTitle}>Register</Text>
            <View style={styles.inputView}>
              <TextInput
                value={name}
                style={styles.inputText}
                onChangeText={value => setName(value)}
                placeholder="Name"
                placeholderTextColor="#00000050"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={adm_no}
                style={styles.inputText}
                onChangeText={value => setAdmNumber(value)}
                placeholder="Admission Number"
                keyboardType="numeric"
                placeholderTextColor="#00000050"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={department}
                style={styles.inputText}
                onChangeText={value => setDepartment(value)}
                placeholder="Department"
                placeholderTextColor="#00000050"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={year}
                style={styles.inputText}
                onChangeText={value => setYear(value)}
                placeholder="Year"
                placeholderTextColor="#00000050"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={password}
                style={styles.inputText}
                onChangeText={value => setPassword(value)}
                placeholder="Password"
                placeholderTextColor="#00000050"
                secureTextEntry
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={mobile}
                style={styles.inputText}
                onChangeText={value => setMobile(value)}
                placeholder="Mobile Number"
                placeholderTextColor="#00000050"
                textColor="black"
                keyboardType="numeric"
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
          <Pressable onPress={loginBtnHandler} style={styles.registerBtn}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              Login
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
    margin: 5,
  },
  formTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    margin: 5,
  },
  form: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowRadius: 1000,
    elevation: 2,
    width: '80%',
    alignItems: 'center',
    marginBottom: 150,
  },
  inputView: {
    flexDirection: 'row',
    margin: 3,
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
    color: 'black',
  },
  submitBtn: {
    backgroundColor: '#000',
    padding: 10,
    color: '#fff',
    borderRadius: 5,
    margin: 5,
  },
  error: {
    margin: 10,
    color: '#f00',
    fontWeight: 'bold',
    bottom: 150,
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
});

export default Register;
