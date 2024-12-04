import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../constants';
import {cloudImage} from '../../../../../constants/images';
import {useSelector} from 'react-redux';
import {isCurrentDay} from '../../../../../utils/isCurrentDay';
import {getDateTime} from '../../../../../utils/unixParse';
import LottieView from 'lottie-react-native';
import {getWeatherIcon} from '../../../../../utils/getWeatherIcon';

const WeeklyFeed = () => {
  const currentForecast = useSelector(state => state?.weather?.currentForecast);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={currentForecast?.list}
        renderItem={({item}) => (
          <View style={styles.row}>
            <View
              style={isCurrentDay(item?.dt) ? styles.cardActive : styles.card}>
              <Text
                style={
                  isCurrentDay(item?.dt) ? styles.timeActive : styles.time
                }>
                {getDateTime(item?.dt, 'dddd')}
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
                  {item?.main?.temp_max?.toFixed(0)}°
                </Text>
                <View style={styles.divider} />
                <Text style={{color: 'rgba(255,255,255,0.6)'}}>
                  {item?.main?.temp_min?.toFixed(0)}°
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
    width: 100,
    height: 180,
    backgroundColor: 'rgba(255,255,255,0.09)',
    // borderRadius: 20,
    marginTop: -5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  time: {
    fontSize: 12,
    color: COLORS.white,
  },
  cardActive: {
    width: 100,
    height: 180,
    marginTop: -5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: COLORS.white,
    // borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  timeActive: {
    fontSize: 12,
    color: COLORS.white,
  },
  image: {
    marginTop: 20,
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  divider: {
    height: 16,
    marginLeft: -2,
    width: 0.5,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
