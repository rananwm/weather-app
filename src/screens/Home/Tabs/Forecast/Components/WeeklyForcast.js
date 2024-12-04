import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../constants';
import {cloudImage} from '../../../../../constants/images';

import {getDateTime} from '../../../../../utils/unixParse';
import LottieView from 'lottie-react-native';
import {getWeatherIcon} from '../../../../../utils/getWeatherIcon';

const data = [
  {
    id: 1,
    time: 'Monday',
    date: '12/12/2019',
    icon: 'cloud',
    tempHigh: '32°',
    tempLow: '28°',
  },
  {
    id: 2,
    time: 'Tuesday',
    date: '12/12/2019',
    icon: 'cloud',
    tempHigh: '32°',
    tempLow: '28°',
  },
  {
    id: 3,
    time: 'Wednesday',
    date: '12/12/2019',
    icon: 'Thursday',
    tempHigh: '32°',
    tempLow: '28°',
  },
  {
    id: 4,
    time: 'Friday',
    date: '12/12/2019',
    icon: 'cloud',
    tempHigh: '32°',
    tempLow: '28°',
  },
  {
    id: 5,
    time: 'Saturday',
    date: '12/12/2019',
    icon: 'cloud',
    tempHigh: '32°',
    tempLow: '28°',
  },
  {
    id: 6,
    time: 'Sunday',
    date: '12/12/2019',
    icon: 'cloud',
    tempHigh: '32°',
    tempLow: '28°',
  },
];

const WeeklyForcast = ({forecast = []}) => {
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={forecast}
        renderItem={({item, index}) => {
          return (
            <View style={styles.row}>
              <View style={styles.card}>
                <View>
                  <Text style={styles.time}>
                    {getDateTime(item?.dt, 'dddd')}
                  </Text>
                  <Text style={styles.date}>Rain: {item?.clouds}%</Text>
                </View>
                <LottieView
                  style={styles.image}
                  speed={0.8}
                  source={getWeatherIcon('01d')}
                  autoPlay
                  loop
                />

                {/* <Lottie
                  style={styles.image}
                  speed={1}
                  source={index % 2 === 0 ? Weather.RaindAndSun : Weather.Sunny}
                  autoPlay
                  loop
                /> */}
                <View style={styles.tempsRow}>
                  <Text style={styles.tempHigh}>
                    {item?.temp?.max?.toFixed(0) || 0}
                  </Text>
                  <Text style={styles.divider}>/</Text>
                  <Text style={styles.tempLow}>
                    {item?.temp?.min?.toFixed(0) || 0}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item?.dt?.toString()}
      />
      <View style={styles.chartContainer} />
    </View>
  );
};

export default WeeklyForcast;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,

    justifyContent: 'center',
  },
  row: {
    marginTop: 10,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  card: {
    width: '95%',
    height: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  time: {
    width: 90,
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.white,
  },
  date: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 5,
  },

  image: {
    width: 50,
    height: 50,
  },
  tempsRow: {
    flexDirection: 'row',
  },
  tempHigh: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  divider: {
    fontSize: 20,
    marginHorizontal: 5,
    color: COLORS.white,
  },
  tempLow: {
    fontSize: 20,
    color: COLORS.white,
    opacity: 0.7,
    fontWeight: 'bold',
    marginLeft: 3,
  },
});
