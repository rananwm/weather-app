import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WeeklyFeed from './WeeklyFeed';

const ForeCastFeed = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Text style={styles.tabTextActive}>5 Days Hourly Forecast</Text>
      </View>
      <WeeklyFeed />
    </View>
  );
};

export default ForeCastFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  tab: {
    marginTop: 10,
    flexDirection: 'row',
  },
  tabText: {
    color: 'rgba(255,255,255,0.4)',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
