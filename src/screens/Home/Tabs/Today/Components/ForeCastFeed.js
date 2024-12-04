import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import TodayFeed from './TodayFeed'
import WeeklyFeed from './WeeklyFeed'

const ForeCastFeed = ({ weather }) => {
    const [activeTab, setActiveTab] = useState('hourly')
    return (
        <View style={styles.container}>
            <View style={styles.tab}>
                <TouchableOpacity disabled={activeTab === 'hourly'} onPress={() => setActiveTab('hourly')}>
                    <Text style={activeTab === 'hourly' ? styles.tabTextActive : styles.tabText}>Hourly</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={activeTab === 'monthly'} onPress={() => setActiveTab('monthly')}>
                    <Text style={activeTab === 'monthly' ? styles.tabTextActive : styles.tabText}>Weekly</Text>
                </TouchableOpacity>
            </View>
            {activeTab === 'hourly' ? <TodayFeed /> : <WeeklyFeed weekly={weather?.weekly} />}
        </View>
    )
}

export default ForeCastFeed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        marginHorizontal: 12
    },
    tab: {
        marginTop: 10,
        flexDirection: 'row'
    },
    tabText: {
        color: 'rgba(255,255,255,0.4)',
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    tabTextActive: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

})