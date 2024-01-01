import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const DayDetailScreen = () => {
  return (
    <View>
      <Stack.Screen options={{title: 'Day 1'}}/>
      <Text>DayDetailScreen</Text>
    </View>
  )
}

export default DayDetailScreen

const styles = StyleSheet.create({})