import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {ProgramContext} from '../../../store/ProgramContext';
import {BaseUrl} from '../../../constents';
import {useFetch} from '../../../hooks/useFetch';

const GroupePrograms = ({navigation, route}) => {
  const {user, setGroupe} = useContext(ProgramContext);
  const {eventId} = route.params;

  const {data: groupe, pending} = useFetch(
    `${BaseUrl}/programs/groupe/${eventId}/${user}`,
    'groupe',
    navigation,
  );

  useEffect(() => {
    const check = () => {
      if (!pending) {
        setGroupe([...groupe]);
      }
    };
    check();
  }, [pending]);

  const viewProgramDetails = index => {
    navigation.navigate('programDetails', {
      title: 'Details',
      index,
    });
  };

  return (
    <View style={styles.body}>
      {groupe && (
        <FlatList
          data={groupe}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => viewProgramDetails(index)}
              style={({pressed}) => [
                styles.program,
                {
                  elevation: pressed ? 3 : 1,
                },
              ]}>
              <Text style={styles.programTitle}>
                {item.program_name}
              </Text>
            </Pressable>
          )}
          style={styles.lists}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

export default GroupePrograms;

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
