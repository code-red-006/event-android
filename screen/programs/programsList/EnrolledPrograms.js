import {View, Text, StyleSheet, Pressable, SectionList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ProgramContext} from '../../../store/ProgramContext';
import {useFetch} from '../../../hooks/useFetch';
import {BaseUrl} from '../../../constents';

const EnrolledPrograms = ({navigation, route}) => {
  const {user, setEnrolledGroupe, setEnrolledSingle} =
    useContext(ProgramContext);
  const {eventId} = route.params;
  const [programs, setPrograms] = useState(null);

  const {data, pending} = useFetch(
    `${BaseUrl}/programs/enrolled/${eventId}/${user}`,
    'enrolled',
    navigation,
  );

  useEffect(() => {
    const check = () => {
      if (!pending) {
        const temp = [
          {
            title: 'Single programs',
            data: [...data[0]],
          },
          {
            title: 'Groupe programs',
            data: [...data[1]],
          },
        ];
        setPrograms([...temp]);

        setEnrolledGroupe([...data[1]]);
        setEnrolledSingle([...data[0]]);
      }
    };
    check();
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
      check();
    });
    return unsubscribe;
  }, [pending, data]);

  const viewProgramDetails = (index, section) => {
    console.log(section.title);
    console.log(index);
    if (section.title === 'Single programs') {
      navigation.navigate('programDetails', {
        title: 'Details',
        index,
        single: true,
        enrolled: true,
      });
    } else {
      navigation.navigate('programDetails', {
        title: 'Details',
        index,
        enrolled: true,
        eventId
      });
    }
  };

  const foot = () => (
    <View>
      <Text></Text>
    </View>
  );

  return (
    <View style={styles.body}>
      {programs && (
        <>
          <SectionList
            sections={programs}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.header}>{title}</Text>
            )}
            renderItem={({item, section, index}) => (
              <Pressable
                onPress={() => viewProgramDetails(index, section)}
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
        </>
      )}
    </View>
  );
};

export default EnrolledPrograms;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  lists: {
    padding: 20,
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
  header: {
    fontSize: 25,
    color: '#000',
    margin: 10,
  },
});
