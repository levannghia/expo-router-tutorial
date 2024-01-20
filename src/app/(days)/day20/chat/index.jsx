import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import Message from '@Components/day20/Message'

const barCurrentHeight = StatusBar.currentHeight;
// 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
const ChatScreen = () => {
    const [messages, setMessages] = useState([
        { role: 'system', content: 'You are a helpful assistant' },
        { role: 'user', content: 'You are a helpful assistant' },
        { role: 'assistant', content: 'You are a helpful assistant You are a helpful assistant You are a helpful assistant You are a helpful assistant' },
    ]);

    const [prompt, setPromt] = useState('')

    const onSend = () => {
        setMessages((pre) => {
            return [...pre, { role: 'user', content: prompt }]
        })
        setPromt('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Stack.Screen options={{ headerShown: false }} />
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => (
                        <Message message={item} />
                    )}
                />
                <View style={styles.footer}>
                    <TextInput placeholder="How can I help you" style={styles.input} value={prompt} onChangeText={setPromt} />
                    <TouchableOpacity style={styles.button} onPress={onSend}>
                        <Text style={{ color: '#fff' }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        marginHorizontal: 10,
        paddingTop: Platform.OS == 'android' ? barCurrentHeight : 0
    },

    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 10,
        borderRadius: 50,
        flex: 1,
    },
    button: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginLeft: 10,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
        paddingVertical: 10,
    },
})