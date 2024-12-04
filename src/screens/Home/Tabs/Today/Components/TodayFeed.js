import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../constants';
import {cloudImage} from '../../../../../constants/images';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {getDateTime} from '../../../../../utils/unixParse';
import {isCurrentHour} from '../../../../../utils/isCurrentHour';
import LottieView from 'lottie-react-native';
import {getWeatherIcon} from '../../../../../utils/getWeatherIcon';

const TodayFeed = ({daily}) => {
  const {hourly} = useSelector(state => state?.weather?.latAPIResponse);
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={hourly}
        renderItem={({item}) => {
          return (
            <View style={styles.row}>
              <View
                style={
                  isCurrentHour(item?.dt) ? styles.cardActive : styles.card
                }>
                <Text
                  style={
                    isCurrentHour(item?.dt) ? styles.timeActive : styles.time
                  }>
                  {getDateTime(item?.dt, 'h A')}
                </Text>
                <LottieView
                  style={styles.image}
                  speed={0.8}
                  source={getWeatherIcon('01d')}
                  autoPlay
                  loop
                />

                <Text style={styles.temp}>{item?.temp?.toFixed(0)}°</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item?.dt.toString()}
      />
    </View>
  );
};

export default TodayFeed;

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
    marginHorizontal: 0,
  },
  card: {
    width: 70,
    height: 150,
    backgroundColor: 'rgba(255,255,255,0.09)',
    // borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  time: {
    fontSize: 12,
    color: COLORS.white,
  },
  cardActive: {
    width: 70,
    height: 160,
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
    width: 30,
    height: 30,
  },
  temp: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 3,
  },
});
