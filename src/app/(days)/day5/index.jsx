import { Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@Components/day3/MarkdownDisplay'
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
#  AIRBNB map screen
`;

const DayDetailScreen = () => {
    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
            <Stack.Screen options={{ title: 'Day 5:  AIRBNB map' }} />

            <MarkdownDisplay>{description}</MarkdownDisplay>

            <Link href="/day5/airbnb" asChild>
                <Button title="Go to airBNB" />
            </Link>
        </SafeAreaView>
    )
}

export default DayDetailScreen
