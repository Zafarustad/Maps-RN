import React from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('screen').width;

const SearchBar = ({input, setInput, error, getResult}) => {
  return (
    <>
      <View style={styles.searchCont}>
        <TextInput
          placeholder="Type a Location. Eg: Mumbai"
          value={input}
          onChangeText={(text) => setInput(text)}
          style={styles.searchBar}
        />
        <Pressable style={styles.button} onPress={() => getResult()}>
          <Icon
            style={{alignSelf: 'center'}}
            name="ios-add"
            size={40}
            color="#1E1E1E"
          />
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
    borderBottomColor: '#1E1E1E',
    borderBottomWidth: 1,
    backgroundColor: '#dee3e3',
    padding: 10,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: width * 0.83,
  },
  button: {
    alignItems: 'center',
    marginLeft: 5,
  },
});
