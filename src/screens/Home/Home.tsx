import {SafeAreaView, StatusBar, Alert, ScrollView} from 'react-native';
import React, {useEffect} from 'react';

import {COLORS} from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import * as Location from 'expo-location';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentWeather} from '../../redux/slices/weatherSlice';
import Header from '@/components/Header';
import Today from '@/components/Today';

const Home = () => {
  const currentWeather = useSelector(state => state.weather.currentWeather);
  const currentCoordinates = useSelector(
    state => state.weather.currentCoordinates,
  );
  console.log('currentCoordinates', currentCoordinates);
  const dispatch = useDispatch();
  const fetchMyWeatherData = async () => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      Location.getCurrentPositionAsync({}).then(location => {
        if (currentCoordinates) {
          dispatch(getCurrentWeather({params: currentCoordinates}));
        } else {
          dispatch(getCurrentWeather({params: location.coords}));
        }
      });
    })();
  };
  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, zIndex: 99}}>
      <LinearGradient
        style={{flex: 1}}
        colors={[COLORS.gradientStart, COLORS.gradientMid, COLORS.gradientEnd]}
        start={{x: 0.7, y: 0.3}}
        end={{x: 0.9, y: 1.3}}
        locations={[0, 0.6, 1.0]}>
        <StatusBar backgroundColor={COLORS.gradientStart} />
        {/* Header */}
        <Header />
        <ScrollView>{currentWeather && <Today />}</ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
