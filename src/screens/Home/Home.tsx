import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
  Alert,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import React, {useEffect} from 'react';
import Today from './Tabs/Today/Today';
import Forecast from './Tabs/Forecast/Forecast';
import {COLORS} from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import * as Location from 'expo-location';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentWeather} from '../../redux/slices/weatherSlice';

const renderScene = SceneMap({
  Today,
  Forecast,
});
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white'}}
    style={{backgroundColor: 'rgba(0,0,0,0)'}}
  />
);

const Home = () => {
  const currentWeather = useSelector(state => state.weather.currentWeather);
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
        {/* <Header city={`${city?.name}, ${city?.country}`} /> */}
        {/* <TabView
          navigationState={{index, routes}}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        /> */}
        {currentWeather && <Today />}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
