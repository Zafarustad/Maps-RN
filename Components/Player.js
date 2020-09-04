import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Slider,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NeuMorph from './NeuMorph';
import {useState} from 'react';

const gray = '#91A1BD';

export default Player = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignSelf: 'stretch'}}>
        <View style={{marginHorizontal: 32, marginTop: 32}}>
          <View style={styles.topContainer}>
            <NeuMorph width={50} height={50} borderRadius={150} center>
              <AntDesign
                name="arrowleft"
                size={20}
                color={gray}
                onPress={() => navigation.goBack()}
              />
            </NeuMorph>
            <View>
              <Text style={styles.playing}>PLAYING NOW</Text>
            </View>
            <NeuMorph width={50} height={50} borderRadius={150} center>
              <Entypo name="menu" size={24} color={gray} />
            </NeuMorph>
          </View>
          <View style={styles.songArtContainer}>
            <NeuMorph width={240} height={240} borderRadius={150} center>
              <Image source={require('../Marina.jpg')} style={styles.songArt} />
            </NeuMorph>
          </View>
          <View style={styles.songContainer}>
            <Text style={styles.title}>To Be Human</Text>
            <Text style={styles.artist}>Marina</Text>
          </View>
          <View style={styles.trackContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.time}>1:21</Text>
              <Text style={styles.time}>3:46</Text>
            </View>
            <Slider
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#8AAAFF"
              maximumTrackTintColor="#DAE6F4"
              thumbTintColor="#7B9BFF"
            />
          </View>
          <View style={styles.controlContainer}>
            <NeuMorph width={50} height={50} borderRadius={150} center>
              <MaterialIcons name="fast-rewind" size={24} color={gray} />
            </NeuMorph>
            <NeuMorph
              width={50}
              height={50}
              borderRadius={150}
              center
              style={{
                backgroundColor: '#8AAAFF',
                borderColor: '#8AAAFF',
                width: 50,
                height: 50,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name="pause"
                size={24}
                color={gray}
                color="#FFFFFF"
              />
            </NeuMorph>
            <NeuMorph width={50} height={50} borderRadius={150} center>
              <MaterialIcons name="fast-forward" size={24} color={gray} />
            </NeuMorph>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE9FD',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playing: {
    color: gray,
    fontWeight: '800',
  },
  songArtContainer: {
    marginVertical: 32,
    alignItems: 'center',
  },
  songArt: {
    width: 230,
    height: 230,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 150,
  },
  songContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#6C7A93',
    fontWeight: '600',
  },
  artist: {
    fontSize: 14,
    marginTop: 6,
    color: gray,
    fontWeight: '500',
  },
  trackContainer: {
    marginTop: 32,
    marginBottom: 64,
  },
  time: {
    fontSize: 10,
    color: gray,
    fontWeight: '700',
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
