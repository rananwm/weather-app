import {StyleSheet, Image} from 'react-native';
import React from 'react';

const WeatherMap = () => {
  return (
    <Image
      resizeMode="center"
      source={require('../assets/images/demo_map.jpeg')}
      style={styles.container}
    />
  );
};

export default WeatherMap;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15,
    width: '93%',
    resizeMode: 'cover',
    opacity: 0.9,
    height: 170,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
    padding: 10,
    justifyContent: 'center',
  },
});
