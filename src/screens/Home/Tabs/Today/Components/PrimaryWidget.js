import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../constants';
import Lottie from 'lottie-react-native';
import {getWindDirection} from '../../../../../utils/getWindDirection';
import {getWeatherIcon} from '../../../../../utils/getWeatherIcon';
import Entypo from '@expo/vector-icons/Entypo';
import {useSelector} from 'react-redux';

const MainWidget = ({current}) => {
  const currentWeather = useSelector(state => state?.weather?.currentWeather);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          marginBottom: 10,
          marginTop: -8,
          borderRadius: 3,
          padding: 6,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Entypo name="location-pin" size={20} color="white" />
        <Text style={{marginLeft: 5, color: 'white', fontSize: 16}}>
          {currentWeather?.name}, {currentWeather?.sys?.country}
        </Text>
      </View>

      <View style={styles.tempRow}>
        <View>
          <Text style={styles.weatherConditionText}>
            {currentWeather?.weather[0]?.description?.toUpperCase()}
          </Text>
          <Text style={styles.tempText}>
            {currentWeather?.main?.temp?.toFixed(0)}°
          </Text>
        </View>
        <View>
          <Lottie
            style={styles.cloudImage}
            speed={0.8}
            source={getWeatherIcon(currentWeather?.weather[0]?.icon)}
            autoPlay
            loop
          />
        </View>
      </View>
    </View>
  );
};

export default MainWidget;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.09)',
    // backgroundColor: 'red',
    padding: 15,
    // marginHorizontal: 20,
    marginTop: 50,
    alignSelf: 'center',
    borderRadius: 3,
    width: '94%',
    // borderbot

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentTime: {
    fontSize: 10,
    color: COLORS.white,
    backgroundColor: 'rgba(0,0,0,0.09)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  tempRow: {
    // flex: 1,
    flexDirection: 'row',
    // marginTop: 15,
    // paddingHorizontal: 25,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cloudImage: {
    marginLeft: -30,
    // backgroundColor: "red",
    width: 100,
    height: 100,
  },
  tempText: {
    marginTop: -10,
    fontSize: 90,
    fontWeight: '200',
    color: COLORS.white,
  },
  weatherConditionText: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    // paddingHorizontal: 15,
    // fontWeight: 'bold',
    // paddingVertical: 5,
    // marginTop: -10,
    // borderRadius: 10,
    fontSize: 20,
    color: COLORS.white,
    // alignSelf: 'flex-start',
    // marginLeft: -25,
  },
  bottomText: {
    fontSize: 12,
    color: '#9B9EAD',
    marginHorizontal: 15,
    // marginLeft: -25,
  },
  tempUnitText: {
    fontSize: 35,
    position: 'absolute',
    color: 'white',
    right: 3,
    bottom: 35,
    fontWeight: 'bold',
  },
});
