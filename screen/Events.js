import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useFetch} from '../hooks/useFetch';
import {BaseUrl} from '../constents';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import BG from '../assets/bg.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import {ProgramContext} from '../store/ProgramContext';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Events = ({navigation}) => {
  const bgArray = [BG, bg2, bg3];
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState(null);
  const [houseList, setHouseList] = useState([]);
  const {house, setHouse, user} = useContext(ProgramContext);
  const [loading, setLoading] = useState(true);
  const {data: events, pending} = useFetch(
    `${BaseUrl}/events`,
    'events',
    navigation,
  );
  useEffect(() => {
    if (!pending) {
      console.log(events);
      setLoading(false);
    }
  }, [pending]);

  const viewEvent = async (eventId, index) => {
    console.log(eventId);
    setId(eventId);
    let flag = false;
    let type = false;
    if (events[index].type != 'other') {
      if (!house) {
        const url = `${BaseUrl}/house/${user}`;
        try {
          const token = await AsyncStorage.getItem('token');
          const res = await axios.get(url, {
            headers: {Authorization: `Bearer ${token}`},
          });
          if (res.data.house) {
            console.log('house yes');
            setHouse(res.data.house);
            navigation.navigate('programs', {eventId});
          } else {
            console.log('no house');
            const temp = [];
            events[index].houses.forEach(item => {
              temp.push({
                label: item,
                value: item,
              });
            });
            setHouseList([...temp]);
            setPopup(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        navigation.navigate('programs', {eventId});
      }
    }
  };

  const submit = async () => {
    if (value) {
      setHouse(value);
    }
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        `${BaseUrl}/house/${user}`,
        {house: value},
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
    } catch (error) {
      console.log(error);
      return
    }
    let eventId = id;
    setPopup(false);
    navigation.navigate('programs', {eventId});
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.body}>
      {loading && (
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {events && (
        <>
          <FlatList
            data={events}
            renderItem={({item, index}) => (
              <Pressable
                android_ripple={{color: '#00000098'}}
                onPress={() => viewEvent(item._id, index)}>
                <View style={styles.event}>
                  <ImageBackground
                    style={{flex: 1, padding: 20}}
                    imageStyle={styles.bg}
                    source={bgArray[index]}>
                    <Text style={styles.eventName}>{item.event_name}</Text>
                  </ImageBackground>
                </View>
              </Pressable>
            )}
            keyExtractor={item => item._id}
          />
          {popup && (
            <View style={styles.popup}>
              <View style={styles.form}>
                <Text style={styles.popupTitle}>Enter Groupe Name</Text>
                <View style={styles.container}>
                  {renderLabel()}
                  <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={houseList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValue(item.value);
                      setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                      />
                    )}
                  />
                </View>
                <Pressable
                  onPress={submit}
                  style={styles.submitBtn}
                  android_ripple={{color: '#ffffff98'}}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Submit
                  </Text>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
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
  events: {
    flex: 1,
    padding: 20,
  },
  list: {
    alignItems: 'center',
    backgroundColor: '#000',
  },
  event: {
    backgroundColor: 'white',
    margin: 10,
    elevation: 3,
    borderRadius: 15,
    height: 150,
  },
  eventName: {
    fontSize: 20,
    color: 'black',
  },
  bg: {
    borderRadius: 15,
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
  container: {
    backgroundColor: 'white',
    padding: 16,
    width: '100%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Events;
