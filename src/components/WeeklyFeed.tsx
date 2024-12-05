import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {COLORS} from '@/constants';
import {useSelector} from 'react-redux';
import {getDateTime, getTime} from '@/utils/unixParse';
import LottieView from 'lottie-react-native';
import {getWeatherIcon} from '@/utils/getWeatherIcon';
import {showTemperature} from '@/utils/convertUnit';

const WeeklyFeed = () => {
  const currentForecast = useSelector(state => state?.weather?.currentForecast);
  const temperatureUnit = useSelector(state => state?.weather?.temperatureUnit);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={currentForecast?.list}
        renderItem={({item}) => (
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={[styles.time, {fontSize: 12, marginTop: -4}]}>
                {getDateTime(item?.dt, 'dddd')}
              </Text>
              <Text style={[styles.time, {fontSize: 14, fontWeight: 'bold'}]}>
                {getTime(item?.dt, 'h A')}
              </Text>
              <LottieView
                style={styles.image}
                speed={0.8}
                source={getWeatherIcon(item?.weather[0]?.icon)}
                autoPlay
                loop
              />

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 60,
                  marginTop: 10,
                }}>
                <Text style={styles.temp}>
                  {showTemperature(
                    item?.main?.temp_max?.toFixed(0),
                    temperatureUnit,
                  )}
                  °
                </Text>
                <View style={styles.divider} />
                <Text style={{color: 'rgba(255,255,255,0.6)'}}>
                  {showTemperature(
                    item?.main?.temp_min?.toFixed(0),
                    temperatureUnit,
                  )}
                  °
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item?.dt.toString()}
      />
    </View>
  );
};

export default WeeklyFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 4,
  },
  card: {
    width: 125,
    height: 155,
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: 3,
    marginTop: -5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  time: {
    fontSize: 12,
    color: COLORS.white,
  },

  timeActive: {
    fontSize: 12,
    color: COLORS.white,
  },
  image: {
    marginTop: 10,
    width: 30,
    height: 30,
  },
  temp: {
    fontSize: 15,
    marginTop: -2,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  divider: {
    height: 14,
    marginLeft: -2,
    width: 0.5,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
