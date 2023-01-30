import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ProgramContext} from '../../store/ProgramContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../constents';
import axios from 'axios';

const ProgramDetails = ({route}) => {
  const {single, groupe, enrolledSingle, enrolledGroupe} =
    useContext(ProgramContext);
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(null);
  const [enrolled, setEnrolled] = useState(true);
  const {index} = route.params;
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (route.params.enrolled) {
      if (route.params.single) {
        setData(enrolledSingle);
      } else {
        setData(enrolledGroupe);
      }
    } else {
      setEnrolled(false);
      if (route.params.single) {
        setData(single);
      } else {
        setData(groupe);
      }
    }
  }, [index]);

  const enroll = async single => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      if (single) {
        const url = `${BaseUrl}/single/${data[index]._id}/${userId}`;
        await axios.get(url, {
          headers: {Authorization: `Bearer ${token}`},
        });
      } else {
        if (name.length < 1) return Alert.alert('fill the form');
        const url = `${BaseUrl}/groupe/${data[index]._id}/${userId}`;
        const groupe = {
          head_id: userId,
          groupe_name: name,
        };
        await axios.post(
          url,
          {groupe},
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );
        setPopup(false);
      }
      setEnrolled(true);
      setUpdate({hi: 'yes'});
    } catch (error) {
      Alert.alert('error');
    }
  };

  return (
    <>
      <View style={styles.body}>
        {data && (
          <>
            <Text style={styles.title}>{data[index].program_name}</Text>
            <Text style={styles.description}>{data[index].description}</Text>
            <View style={styles.time}>
              <Text style={styles.timeLabel}>
                Start Time :{' '}
                {data[index].start_time !== ''
                  ? data[index].start_time
                  : 'Not Set'}
              </Text>
              <Text style={styles.timeLabel}>
                Report Time :{' '}
                {data[index].report_time !== ''
                  ? data[index].report_time
                  : 'Not Set'}
              </Text>
            </View>
          </>
        )}
        {enrolled ? (
          <></>
        ) : (
          <Pressable
            onPress={
              route.params.single ? () => enroll(true) : () => setPopup(true)
            }
            android_ripple={{color: '#ffffff90'}}
            style={styles.enrollBtn}>
            <Text style={styles.btnLabel}>Enroll</Text>
          </Pressable>
        )}
      </View>
      {popup && (
        <View style={styles.popup}>
          <View style={styles.form}>
            <Text style={styles.popupTitle}>Enter Groupe Name</Text>
            <TextInput
              value={name}
              style={styles.inputText}
              onChangeText={value => setName(value)}
              placeholder="Groupe Name"
              placeholderTextColor="#00000050"
            />
            <Pressable
              onPress={() => enroll(false)}
              style={styles.submitBtn}
              android_ripple={{color: '#ffffff98'}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Submit</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => setPopup(false)}
            style={styles.cancelBtn}
            android_ripple={{color: '#ffffff98'}}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Cancel</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default ProgramDetails;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'black',
    fontSize: 35,
    margin: 10,
  },
  description: {
    color: 'black',
    marginTop: 20,
    margin: 5,
    fontSize: 18,
  },
  time: {
    margin: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  timeLabel: {
    margin: 5,
    color: 'black',
    fontSize: 20,
  },
  enrollBtn: {
    padding: 12,
    backgroundColor: 'blue',
    borderRadius: 5,
    margin: 20,
    paddingHorizontal: 20,
  },
  btnLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  inputText: {
    color: 'black',
    backgroundColor: '#fff',
    borderColor: '#00000070',
    borderWidth: 1.5,
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    width: '90%',
    margin: 5,
  },
  popup: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
  },
  form: {
    backgroundColor: '#ffff',
    width: '90%',
    padding: 40,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitBtn: {
    backgroundColor: '#000',
    padding: 10,
    color: '#fff',
    borderRadius: 5,
    margin: 5,
  },
  popupTitle: {
    fontSize: 20,
    color: '#000',
  },
  cancelBtn: {
    backgroundColor: '#f00',
    padding: 10,
    color: '#fff',
    borderRadius: 5,
    margin: 5,
  },
});
