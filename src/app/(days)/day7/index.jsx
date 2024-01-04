import { Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@Components/day3/MarkdownDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
# Tinder Voice Memos

Build the iOS Voice Memos app in React Native
`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1}} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Day 7: Voice Memos' }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day7/memos" asChild>
        <Button title="Go to Memos" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;