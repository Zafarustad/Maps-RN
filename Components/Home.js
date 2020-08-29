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
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          `https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${API_KEY}`,
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
      setError('Somthing went Wrong');
      console.log(error);
    }
  };

  const deleteItem = (id) => {
    setLocations(locations.filter((location) => location.id !== id));
  };

  return (
    <View style={{flex: 1}}>
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
      {locations.length > 0 ? (
        <>
          <Pressable
            style={styles.navigateBtn}
            onPress={() =>
              navigation.navigate('Map', {
                data: locations,
              })
            }>
            <Text>See On Map</Text>
            <Icon
              name="ios-map"
              size={20}
              color="#1E1E1E"
              style={{marginLeft: 10}}
            />
          </Pressable>
          <FlatList
            data={locations}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <>
                <View style={styles.item}>
                  <DeleteIcon
                    name="delete"
                    size={20}
                    color="red"
                    style={styles.deleteIcon}
                    onPress={() => deleteItem(item.id)}
                  />
                  <Text style={styles.itemText}>Location: {item.name}</Text>
                  <Text style={styles.itemText}>Latitude: {item.lat}</Text>
                  <Text style={styles.itemText}>Longitude: {item.lng}</Text>
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
  item: {
    marginBottom: 25,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    borderBottomColor: '#1E1E1E',
    borderBottomWidth: 5,
    backgroundColor: '#dee3e3',
    width: width * 0.9,
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 28,
    justifyContent: 'center',
    padding: 10,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 20,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  itemText: {
    fontSize: 16,
    marginTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    right: 12,
    top: 20,
    zIndex: 1,
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
