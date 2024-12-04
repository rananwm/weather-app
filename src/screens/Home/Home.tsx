import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import React from 'react';
import Today from './Tabs/Today/Today';
import Forecast from './Tabs/Forecast/Forecast';
import {COLORS} from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const renderScene = SceneMap({
  Today,
  Forecast,
});
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white'}}
    style={{backgroundColor: 'rgba(0,0,0,0)'}}
  />
);

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        style={{flex: 1}}
        colors={[COLORS.gradientStart, COLORS.gradientMid, COLORS.gradientEnd]}
        start={{x: 0.7, y: 0.3}}
        end={{x: 0.9, y: 1.3}}
        locations={[0, 0.6, 1.0]}>
        <StatusBar backgroundColor={COLORS.gradientStart} />
        {/* <Header city={`${city?.name}, ${city?.country}`} /> */}
        {/* <TabView
          navigationState={{index, routes}}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        /> */}
        <Today />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
