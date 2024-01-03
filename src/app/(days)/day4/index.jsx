import { Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@Components/day3/MarkdownDisplay'
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
# Animated splash screen
`;

const DayDetailScreen = () => {
    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
            <Stack.Screen options={{ title: 'Day 4: Splashscreen' }} />

            <MarkdownDisplay>{description}</MarkdownDisplay>

            <Link href="/day4/animation" asChild>
                <Button title="Go to the animation" />
            </Link>

            <Link href="/day4/splash" asChild>
                <Button title="Splash screen animation" />
            </Link>
        </SafeAreaView>
    )
}

export default DayDetailScreen
