import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {BaseUrl} from '../../constents';
import {useFetch} from '../../hooks/useFetch';
import {FlatList} from 'react-native-gesture-handler';

const SinglePrograms = ({navigation, route}) => {
  const {eventId} = route.params;

  const {data: single, pending} = useFetch(
    `${BaseUrl}/events/programs/${eventId}`,
    'single',
    navigation,
  );

  const viewProgramDetails = () => {
    navigation.navigate('programDetails', {title: 'hello'})
  }

  return (
    <View style={styles.body}>
      {single && (
        <FlatList
          data={single}
          renderItem={({item, index}) => (
            <Pressable
            onPress={viewProgramDetails}
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
