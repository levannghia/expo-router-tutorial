import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

const DayDetailScreen = () => {
    return (
        <View>
            <Stack.Screen options={{ title: 'Day 2: Onboarding' }} />
            <Link href={'/day2/onboarding'} asChild>
                <TouchableOpacity>
                    <Text>Go to Onboarding</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default DayDetailScreen

const styles = StyleSheet.create({})