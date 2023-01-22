import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFetch} from '../hooks/useFetch';
import {BaseUrl} from '../constents';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import BG from '../assets/bg.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';

const Events = ({navigation}) => {
  const bgArray = [BG, bg2, bg3];
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
  return (
    <View style={styles.body}>
      {loading && (
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {events && (
        <FlatList
          data={events}
          renderItem={({item, index}) => (
            <View style={styles.event}>
              <ImageBackground
                style={{flex: 1, padding: 20}}
                imageStyle={styles.bg}
                source={bgArray[index]}>
                <Text style={styles.eventName}>{item.event_name}</Text>
              </ImageBackground>
            </View>
          )}
          keyExtractor={item => item._id}
        />
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
});

export default Events;
