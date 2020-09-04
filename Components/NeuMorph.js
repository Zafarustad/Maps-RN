import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows';

const NeuMorph = ({children, width, height, borderRadius, style, center}) => {
  return (
    <Shadow
      style={[
        styles.topShadow,
        {width: width, height: height, borderRadius: borderRadius},
      ]}>
      <Shadow
        style={[
          styles.bottomShadow,
          {width: width, height: height, borderRadius: borderRadius},
          center && styles.center,
        ]}>
        <View style={style}>{children}</View>
      </Shadow>
    </Shadow>
  );
};

export default NeuMorph;

const styles = StyleSheet.create({
  topShadow: {
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 7,
    shadowColor: '#FBFFFF',
    backgroundColor: '#DEE9FD',
  },
  bottomShadow: {
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 7,
    shadowColor: '#B7C4DD',
    backgroundColor: '#DEE9FD',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
