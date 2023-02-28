import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {ProgramContext} from '../../../store/ProgramContext';
import {BaseUrl} from '../../../constents';
import {useFetch} from '../../../hooks/useFetch';

const SinglePrograms = ({navigation, route}) => {
  const {eventId} = route.params;
  const {user, setSingle} = useContext(ProgramContext);
  const {data: single, pending} = useFetch(
    `${BaseUrl}/programs/single/${eventId}/${user}`,
    'single',
    navigation,
  );

  useEffect(() => {
    if (!pending) {
      setSingle(single);
    }
  }, [pending]);

  const viewProgramDetails = index => {
    navigation.navigate('programDetails', {
      title: 'Details',
      index,
      single: true,
      eventId,
    });
  };

  const foot = () => (
    <View>
      <Text></Text>
    </View>
  );

  return (
    <View style={styles.body}>
      {single && (
        <FlatList
          data={single}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => viewProgramDetails(index)}
              style={({pressed}) => [
                styles.program,
                {
                  elevation: pressed ? 3 : 1,
                },
              ]}>
              <Text style={styles.programTitle}>{item.program_name}</Text>
            </Pressable>
          )}
          style={styles.lists}
          keyExtractor={item => item._id}
          ListFooterComponent={foot}
        />
      )}
    </View>
  );
};

export default SinglePrograms;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  lists: {
    padding: 15,
    flex: 1,
  },
  program: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
  },
  programTitle: {
    color: '#000',
    fontSize: 20,
  },
});
