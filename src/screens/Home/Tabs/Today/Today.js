import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import PrimaryWidget from './Components/PrimaryWidget';
import SecondaryWidget from './Components/SecondaryWidget';
import TodayForcast from './Components/TodayFeed';
import {useSelector} from 'react-redux';
import ForeCastFeed from './Components/ForeCastFeed';

const Today = () => {
  // const { city } = useSelector(state => state?.weather?.cityAPIResponse)
  const weather = useSelector(state => state?.weather?.latAPIResponse);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: 'transparent',
      }}>
      <PrimaryWidget current={weather?.current} />
      <SecondaryWidget current={weather?.current} />
      <ForeCastFeed weather={weather} />
      <TodayForcast forecast={'daily'} />
    </ScrollView>
  );
};

export default Today;

const styles = StyleSheet.create({});
