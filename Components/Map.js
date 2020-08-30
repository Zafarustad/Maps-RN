import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Map = ({route, navigation}) => {
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

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

export default Map;
