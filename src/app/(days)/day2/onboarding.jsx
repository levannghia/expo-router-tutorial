import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';

const OnboardingScreen = () => {
    return (
        <SafeAreaView style={styles.page}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.pageContent}>
                <FontAwesome5 style={styles.image} name="people-arrows" size={100} color="#cef202" />
                <View style={styles.footer}>
                    <Text style={styles.title}>Track every transaction</Text>
                    <Text style={styles.description}>consectetur adipisicing elit. Quibusdam alias fugit, itaque possimus optio quisquam quas autem</Text>
                    <View style={styles.buttonRow}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    page: {
        // alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#15141a',
    },
    pageContent: {
        padding: 20,
        flex: 1
    },
    title: {
        color: '#fdfdfd',
        fontSize: 50,
        fontFamily: 'InterBold',
        letterSpacing: 1.3,
        marginVertical: 18
    },
    image: {
        alignSelf: 'center',
        margin: 20,
    },
    description: {
        fontFamily: 'Inter',
        color: 'gray',
        fontSize: 18.5,
        lineHeight: 26
    },

    footer: {
        marginTop: 'auto'
    },
    buttonRow: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#302e38',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FDFDFD',
        fontFamily: 'InterBold'
    }
})