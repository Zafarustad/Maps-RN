import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import mapStyle from './mapStyle';

const Map = ({route}) => {
  const [markerIndex, setMarkerIndex] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    setMarkerIndex(0);
  }, []);

  const animateToMarker = (index) => {
    setMarkerIndex(index);
    mapRef.current.animateToRegion(
      {
        latitude: data[index].lat,
        longitude: data[index].lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      2000,
    );
  };

  const {
    params: {data},
  } = route;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: data[0].lat,
          longitude: data[0].lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}>
        {data.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lng,
            }}
            title={marker.name}>
            <Callout tooltip>
              <View>
                <View style={{backgroundColor: '#fff'}}>
                  <Text>{marker.name}</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {data.length > 1 && markerIndex !== data.length - 1 && (
        <Pressable
          onPress={() => animateToMarker(markerIndex + 1)}
          style={[
            styles.animateMarkerBtn,
            {position: 'absolute', bottom: 50, zIndex: 1, right: 20},
          ]}>
          <Icon
            name="arrow-drop-up"
            size={25}
            color="#000"
            style={{transform: [{rotate: '90deg'}]}}
          />
        </Pressable>
      )}
      {markerIndex > 0 && (
        <Pressable
          onPress={() => animateToMarker(markerIndex - 1)}
          style={[
            styles.animateMarkerBtn,
            {position: 'absolute', bottom: 50, zIndex: 1, left: 20},
          ]}>
          <Icon
            name="arrow-drop-up"
            size={25}
            color="#000"
            style={{transform: [{rotate: '-90deg'}]}}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  animateMarkerBtn: {
    backgroundColor: '#fff',
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 5,
    opacity: 0.6,
    borderRadius: 10,
  },
});