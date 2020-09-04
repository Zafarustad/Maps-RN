import React from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NeuMorph from './NeuMorph';

const width = Dimensions.get('screen').width;

const SearchBar = ({input, setInput, error, getResult}) => {
  return (
    <>
      <View style={styles.searchCont}>
        <NeuMorph width={width * 0.75} height={40} borderRadius={50}>
          <TextInput
            placeholder="Type a Location. Eg: Mumbai"
            value={input}
            onChangeText={(text) => setInput(text)}
            style={styles.searchBar}
          />
        </NeuMorph>
        <Pressable style={styles.button} onPress={() => getResult()}>
          <NeuMorph width={40} height={40} borderRadius={150} center>
            <Icon
              style={{alignSelf: 'center'}}
              name="ios-add"
              size={25}
              color="#1E1E1E"
            />
          </NeuMorph>
        </Pressable>
      </View>
      {error && (
        <Text style={{textAlign: 'center', fontSize: 15, color: 'red'}}>
          {error}
        </Text>
      )}
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  searchBar: {
    backgroundColor: '#DEE9FD',
    padding: 10,
    borderRadius: 50,
    width: width * 0.75,
    height: 40,
  },
  button: {
    alignItems: 'center',
    marginLeft: 15,
  },
});
