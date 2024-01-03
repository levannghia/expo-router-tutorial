import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@Components/day3/MarkdownDisplay'

const description = `
# Markdown

Integrate Markdown content in **React Native**

📚 Today's Agenda:
- Introduction to Markdown
- Markdown Syntax Overview
- Setting Up React Native for Markdown
- Implementing Markdown Rendering
- Styling Markdown Content
- Using Markdown in React Native Components
- Recap and Q&A Session
`;

const DayDetailScreen = () => {
    return (
        <View style={{alignItems: 'center', flex: 1}}>
            <Stack.Screen options={{ title: 'Day 3: Markdown' }} />
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Link href={'/day3/editor'} asChild>
                <TouchableOpacity>
                    <Text>Go to editor</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default DayDetailScreen
