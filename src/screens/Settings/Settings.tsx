import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Switch,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../constants/theme';
import {useSelector, useDispatch} from 'react-redux';
import {updateTemperatureUnit} from '@/redux/slices/weatherSlice';

const Settings = () => {
  const temperatureUnit = useSelector(state => state?.weather?.temperatureUnit);
  // State to toggle between Celsius and Fahrenheit
  const dispatch = useDispatch();
  console.log('temperatureUnit', temperatureUnit);
  const isCelsius = temperatureUnit === 'metric';
  const toggleSwitch = () => {
    if (isCelsius) {
      dispatch(updateTemperatureUnit('imperial'));
    } else {
      dispatch(updateTemperatureUnit('metric'));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        style={{flex: 1}}
        colors={[COLORS.gradientStart, COLORS.gradientMid, COLORS.gradientEnd]}
        start={{x: 0.7, y: 0.3}}
        end={{x: 0.9, y: 1.3}}
        locations={[0, 0.6, 1.0]}>
        <StatusBar backgroundColor={COLORS.gradientStart} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        {/* Temperature Unit Setting */}
        <View style={styles.settingsContainer}>
          <Text style={styles.settingLabel}>Temperature Unit</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isCelsius ? 'Celsius' : 'Fahrenheit'}
            </Text>
            <Switch
              value={isCelsius}
              onValueChange={toggleSwitch}
              trackColor={{false: '#767577', true: COLORS.primary}}
              thumbColor={isCelsius ? COLORS.white : COLORS.secondary}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,

    color: COLORS.white,
  },
  settingsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',

    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
    justifyContent: 'space-between',
  },
  switchText: {
    fontSize: 18,
    color: COLORS.white,
  },
});

export default Settings;
