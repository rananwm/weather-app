import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import removeStartingDoubleSlash from '@/helpers/removeStartingDoubleSlash';
import {Feather, Entypo} from '@expo/vector-icons';
import {CurrentWeatherData} from '@/types/CurrentWeatherData';

type CurrentWeatherProp = {
  current?: CurrentWeatherData;
};

const CurrentWeather: React.FC<CurrentWeatherProp> = ({current}) => {
  return (
    <>
      {/* IMAGE VIEW */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              'https://' +
              removeStartingDoubleSlash(current?.condition?.icon || ''),
          }}
          style={styles.weatherImage}
        />
      </View>

      {/* TEMPERATURE CELCIUS & WEATHER TEXT */}
      <View style={styles.weatherTextContainer}>
        <Text style={styles.weatherText}>
          {current?.condition?.text ? '(' + current?.condition?.text + ')' : ''}
        </Text>
      </View>

      {/* TEMPERATURE DISPLAY */}
      <View style={styles.tempContainer}>
        <Text style={styles.tempText}>{current?.temp_c}&#176;</Text>
      </View>

      {/* WEATHER CONDITIONS */}
      <View style={styles.conditionsContainer}>
        <View style={styles.conditionRow}>
          <View style={styles.conditionItem}>
            <Feather name="wind" size={30} color="white" />
            <Text style={styles.conditionText}>{current?.wind_kph} km</Text>
          </View>
          <View style={styles.conditionItem}>
            <Entypo name="drop" size={30} color="white" />
            <Text style={styles.conditionText}>{current?.humidity}%</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherImage: {
    width: 208, // 52 * 4 for a more consistent design
    height: 208, // 52 * 4
  },
  weatherTextContainer: {
    marginTop: -20,
    marginBottom: 8,
    backgroundColor: '#4B5563', // Slate color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  weatherText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    letterSpacing: 2,
  },
  tempContainer: {
    marginTop: 24,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  tempText: {
    fontSize: 72, // 6xl
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  conditionsContainer: {
    alignItems: 'center',
  },
  conditionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  conditionText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CurrentWeather;
