import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@Components/day3/MarkdownDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
# GPT app
Ultimate chat app`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Day 20: Chat GPT API' }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day20/chat" asChild>
        <Button title="Go to Chat" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;