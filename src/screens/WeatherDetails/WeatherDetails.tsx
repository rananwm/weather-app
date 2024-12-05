import {
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';

import {COLORS} from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import * as Location from 'expo-location';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentWeather} from '../../redux/slices/weatherSlice';
import SecondaryWidget from '@/components/SecondaryWidget';
import AirQuality from '@/components/AirQuality';
import WeatherMap from '@/components/WeatherMap';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const WeatherDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fetchMyWeatherData = async () => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      Location.getCurrentPositionAsync({}).then(location => {
        dispatch(getCurrentWeather({params: location.coords}));
      });
    })();
  };
  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        style={{flex: 1}}
        colors={[COLORS.gradientStart, COLORS.gradientMid, COLORS.gradientEnd]}
        start={{x: 0.7, y: 0.3}}
        end={{x: 0.9, y: 1.3}}
        locations={[0, 0.6, 1.0]}>
        <StatusBar backgroundColor={COLORS.gradientStart} />
        {/* Design Header */}
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 15,
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Weather Details
            </Text>
          </View>

          <View></View>
        </View>

        <AirQuality />
        <WeatherMap />
        <SecondaryWidget />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default WeatherDetails;
