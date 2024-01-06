import { Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@Components/day3/MarkdownDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
# Authentication`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1}} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Day 9:  Auth' }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day9/protected" asChild>
        <Button title="Go to Weathers" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;