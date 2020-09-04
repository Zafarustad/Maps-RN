import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  Image,
  Button,
} from 'react-native';
import axios from 'axios';
import SearchBar from './SearchBar';
import config from '../config';
import Icon from 'react-native-vector-icons/Ionicons';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NeuMorph from './NeuMorph';

const width = Dimensions.get('screen').width;

const Home = ({navigation}) => {
  const [locations, setLocations] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 5000);
  }, [error]);

  const getResult = async () => {
    try {
      if (input.trim() === '') {
        setError('Cannot be empty');
      } else {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${config.GOOGLE_API_KEY}`,
        );
        let newLocation = {
          name: input,
          id: res.data.results[0].place_id,
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng,
        };
        setLocations([newLocation, ...locations]);
      }
      setInput('');
    } catch (error) {
      setError('Location not found');
      console.log(error);
    }
  };

  const deleteItem = (id) => {
    setLocations(locations.filter((location) => location.id !== id));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#DEE9FD', alignItems: 'center'}}>
      <SearchBar
        input={input}
        setInput={setInput}
        error={error}
        getResult={getResult}
      />
      <Pressable
        onPress={() => navigation.navigate('Player')}
        style={{alignSelf: 'center'}}>
        <NeuMorph width={90} height={40} borderRadius={50} center>
          <Text>Player</Text>
        </NeuMorph>
      </Pressable>
      {locations.length > 0 ? (
        <>
          <Pressable
            style={{marginVertical: 10, alignSelf: 'flex-end', marginEnd: 28}}
            onPress={() =>
              navigation.navigate('Map', {
                data: locations,
              })
            }>
            <NeuMorph
              width={135}
              center
              height={50}
              borderRadius={50}
              style={styles.navigateBtn}>
              <Text>Open Map</Text>
              <Icon
                name="ios-map"
                size={20}
                color="#1E1E1E"
                style={{marginLeft: 10}}
              />
            </NeuMorph>
          </Pressable>
          <FlatList
            data={locations}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <>
                <View style={styles.item}>
                  <NeuMorph width={width * 0.8} height={130} borderRadius={10}>
                    <DeleteIcon
                      name="delete"
                      size={20}
                      color="red"
                      style={styles.deleteIcon}
                      onPress={() => deleteItem(item.id)}
                    />
                    <View style={{marginLeft: 15, marginTop: 10}}>
                      <Text style={styles.itemText}>Location: {item.name}</Text>
                      <Text style={styles.itemText}>Latitude: {item.lat}</Text>
                      <Text style={styles.itemText}>Longitude: {item.lng}</Text>
                    </View>
                  </NeuMorph>
                </View>
              </>
            )}
          />
        </>
      ) : (
        <View style={styles.noResult}>
          <Image
            source={require('../Map-dark2.png')}
            style={{width: 280, height: 280}}
          />
          <Text style={{fontSize: 20}}>Start Adding locations!</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    borderBottomColor: '#1E1E1E',
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    marginTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
