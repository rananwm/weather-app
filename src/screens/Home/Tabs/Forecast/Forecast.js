import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WeeklyForcast from './Components/WeeklyForcast';
import {useSelector} from 'react-redux';
const Forecast = () => {
  const {current, daily} = useSelector(state => state?.weather?.latAPIResponse);
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      {/* <WeeklyForcast forecast={daily} /> */}
    </View>
  );
};

export default Forecast;

const styles = StyleSheet.create({});
