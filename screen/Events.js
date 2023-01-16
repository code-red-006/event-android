import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SectionList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFetch} from '../hooks/useFetch';
import {BaseUrl} from '../constents';
import {FlatList} from 'react-native-gesture-handler';

const Events = ({navigation}) => {
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
        <View style={styles.events}>
          <FlatList
            numColumns={2}
            data={events}
            renderItem={({item}) => (
              <View style={styles.event}>
                <Text style={styles.eventName}>{item.event_name}</Text>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    padding: 10,
  },
  event: {
    backgroundColor: 'white',
    padding: 25,
    margin: 10,
    elevation: 3,
    borderRadius: 15,
    width: '45%',
    minHeight: 200,
    alignItems: 'center',
  },
  eventName: {
    fontSize: 20,
    color: 'black',
  },
});

export default Events;
