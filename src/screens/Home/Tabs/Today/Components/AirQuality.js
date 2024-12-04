import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../../constants';
import * as Progress from 'react-native-progress';

const AirQuality = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Air Quality</Text>
      <View style={styles.aqiContainer}>
        <Progress.Circle
          animated
          style={styles.progressBar}
          textStyle={{ fontWeight: '600', fontSize: 30 }}
          progress={400 / 500}
          thickness={5}
          size={90}
          color={COLORS.lightGrey}
          // color={getScoreColor(count)}
          unfilledColor={COLORS.secondary}
          borderColor={COLORS.secondary}
          showsText={true}
        />
        <Text style={styles.aqiText}>
          You have good air quality - enjoy your outdoor activities.
        </Text>
      </View>
      <View style={styles.bottomAqi}>
        <Text style={styles.bottomAqiText}>
          US EPA AQI{' '}
          <Text style={{ color: COLORS.white, fontWeight: '600' }}>49/500</Text>
        </Text>
        <Text style={styles.bottomAqiText}>
          Dominant pollutant
          <Text style={{ color: COLORS.white, fontWeight: '600' }}> PM 10 </Text>
        </Text>
      </View>
    </View>
  );
};

export default AirQuality;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 8,
    height: 170,
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: 3,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: COLORS.white,

    fontWeight: '600',
  },
  aqiContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  progressBar: {
    marginTop: 10,
  },
  aqiText: {
    width: '70%',
    marginLeft: 15,
    color: COLORS.secondarytext,
    fontSize: 12,
    lineHeight: 17,
  },
  bottomAqi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  bottomAqiText: {
    color: COLORS.secondarytext,
    fontSize: 12,
  },
});
