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
import {FlatList} from 'react-native-gesture-handler';

const ProgramDetails = ({route}) => {
  const {
    single,
    groupe,
    enrolledSingle,
    house,
    enrolledGroupe,
    admNo: adm,
  } = useContext(ProgramContext);
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(null);
  const [enrolled, setEnrolled] = useState(true);
  const {index} = route.params;
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState('');
  const [admNo, setAdmNo] = useState('');
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState([]);

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

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  const enroll = async single => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      if (single) {
        const url = `${BaseUrl}/single/${data[index]._id}`;
        await axios.post(
          url,
          {
            userId,
            type: data[index].type ? data[index].type : null,
            house: house ? house : null,
            eventId: route.params.eventId,
          },
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );
      } else {
        if (data[index].type) {
          await axios.get(`${BaseUrl}/check/${data[index].type}/${adm}`, {
            headers: {Authorization: `Bearer ${token}`},
          });
        }

        if (name.length < 1) return Alert.alert('fill the form');
        const url = `${BaseUrl}/groupe/${data[index]._id}/${userId}`;
        const groupe = {
          head_id: userId,
          group_name: name,
          house: house,
          members: [...memberId],
        };
        await axios.post(
          url,
          {groupe, type: data[index].type ? data[index].type : null},
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );
        setPopup(false);
      }
      setEnrolled(true);
      setUpdate({hi: 'yes'});
    } catch (error) {
      Alert.alert(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  const removeMember = index => {
    console.log(index);
    let temp = members;
    temp.splice(index, 1);
    setMembers([...temp]);
    temp = memberId;
    temp.splice(index, 1);
    setMemberId([...temp]);
    return;
  };

  const addMembers = async () => {
    if (admNo.length !== 8) return Alert.alert('eneter valid admission number');
    if (admNo == adm) return Alert.alert('enter your team mates number');
    if (data[index].type) {
      try {
        const token = await AsyncStorage.getItem('token');
        const type = data[index].type;
        const res = await axios.get(`${BaseUrl}/check/${type}/${admNo}`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        console.log(res.data.user._id);
        let temp = members;
        temp.push(admNo);
        temp = removeDuplicates(temp);
        setMembers([...temp]);
        temp = memberId;
        temp.push(res.data.user._id);
        temp = removeDuplicates(temp);
        setMemberId([...temp]);
      } catch (error) {}
    }
  };
  return (
    <>
      <View style={styles.body}>
        {data && (
          <>
            <Text style={styles.title}>{data[index].program_name}</Text>
            <Text style={styles.description}>{data[index].description}</Text>
            <Text style={styles.description}>
              {data[index].type ? data[index].type : ''}
            </Text>
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
            <Text style={styles.popupTitle}>Groupe Name</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                value={name}
                style={styles.inputText}
                onChangeText={value => setName(value)}
                placeholder="Groupe Name"
                placeholderTextColor="#00000050"
              />
            </View>
            <Text style={styles.popupTitle}>Add members</Text>
            <View style={styles.addMembers}>
              <TextInput
                value={admNo}
                style={[styles.inputText, {width: '80%'}]}
                onChangeText={value => setAdmNo(value)}
                placeholder="admission number"
                placeholderTextColor="#00000050"
                keyboardType="numeric"
              />
              <View style={{justifyContent: 'center'}}>
                <Pressable
                  onPress={addMembers}
                  style={styles.submitBtn}
                  android_ripple={{color: '#ffffff98'}}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>Add</Text>
                </Pressable>
              </View>
            </View>
            <View>
              <FlatList
                data={members}
                renderItem={({item, index}) => (
                  <View style={styles.member}>
                    <Text style={{color: 'black'}}>{item}</Text>
                    <Pressable
                      onPress={() => removeMember(index)}
                      style={styles.removeBtn}
                      android_ripple={{color: '#ffffff98'}}>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>X</Text>
                    </Pressable>
                  </View>
                )}
                style={styles.memebrList}
                keyExtractor={(item, index) => index}
                extraData={members}
              />
            </View>
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
    fontSize: 15,
    padding: 5,
    flex: 1,
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
    padding: 25,
    borderRadius: 5,
  },
  submitBtn: {
    backgroundColor: '#000',
    padding: 10,
    color: '#fff',
    borderRadius: 5,
    margin: 5,
    alignSelf: 'center',
  },
  popupTitle: {
    fontSize: 15,
    color: '#000',
  },
  cancelBtn: {
    backgroundColor: '#f00',
    padding: 10,
    color: '#fff',
    borderRadius: 5,
    margin: 5,
  },
  addMembers: {
    flexDirection: 'row',
  },
  memebrList: {
    backgroundColor: 'white',
    padding: 5,
    margin: 5,
    maxHeight: 200,
  },
  member: {
    flexDirection: 'row',
    margin: 2,
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeBtn: {
    backgroundColor: '#f00',
    padding: 5,
    color: '#fff',
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: 'center',
  },
});
