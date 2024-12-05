import {StyleSheet, Image} from 'react-native';
import React from 'react';

const WeatherMap = () => {
  return (
    <Image
      source={require('../../../../../assets/images/demo_map.jpeg')}
      style={styles.container}
    />
  );
};

export default WeatherMap;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15,
    width: '90%',
    resizeMode: 'cover',
    opacity: 0.9,

    height: 170,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
  },
});
