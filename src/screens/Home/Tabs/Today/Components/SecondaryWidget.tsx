import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../constants';
import {cloudImage} from '../../../../../constants/images';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {getWindDirection} from '../../../../../utils/getWindDirection';
import {useSelector} from 'react-redux';

const SecondaryWidget = ({current}) => {
  const currentWeather = useSelector(state => state?.weather?.currentWeather);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.time}>Rain Chances</Text>
          <Feather name="cloud-rain" size={30} color={COLORS.white} />
          <Text style={styles.temp}>{currentWeather?.clouds?.all}%</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.time}>Humidity</Text>
          <Entypo name="water" size={30} color={COLORS.white} />
          <Text style={styles.temp}>{currentWeather?.main?.humidity}%</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.time}>Wind</Text>
          <Feather name="wind" size={30} color={COLORS.white} />
          <Text style={styles.temp}>
            {currentWeather?.wind?.speed?.toFixed(0)} KM/h{' '}
            {getWindDirection(currentWeather?.wind?.deg)}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.time}>Pressure</Text>
          <FontAwesome5 name="tachometer-alt" size={30} color="white" />
          <Text style={styles.temp}>{currentWeather?.main?.pressure}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.time}>Visibility</Text>
          <MaterialIcons name="visibility" size={30} color="white" />
          <Text style={styles.temp}>
            {currentWeather?.visibility / 1000} KM
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.time}>Sea Level</Text>
          <MaterialCommunityIcons
            name="sun-thermometer"
            size={30}
            color="white"
          />
          <Text style={styles.temp}>
            {currentWeather?.main?.sea_level?.toFixed(0)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SecondaryWidget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    // flex: 2,
  },
  row: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,

    marginHorizontal: 5,
  },
  card: {
    margin: 5,
    width: '30%',
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  time: {
    fontSize: 13,
    color: COLORS.white,
  },

  timeActive: {
    fontSize: 12,
    color: COLORS.white,
  },
  image: {
    width: 30,
    height: 30,
  },
  temp: {
    fontSize: 18,
    color: COLORS.white,
    // fontWeight: 'bold',
    marginLeft: 3,
  },
});
