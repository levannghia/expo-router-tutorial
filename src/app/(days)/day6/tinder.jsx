import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import TinderCard from '@Components/day6/TinderCard'
import { Stack } from 'expo-router'
import { useSharedValue } from 'react-native-reanimated'

const dummuUsers = [
    {
        id: 1,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg',
        name: 'Dani',
    },
    {
        id: 2,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg',
        name: 'Jon',
    },
    {
        id: 3,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg',
        name: 'Dani',
    },
    {
        id: 4,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg',
        name: 'Alice',
    },
    {
        id: 5,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg',
        name: 'Dani',
    },
    {
        id: 6,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/6.jpg',
        name: 'Kelsey',
    },
];

const TinderScreen = () => {
    const activeIndex = useSharedValue(0);
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            {dummuUsers.map((item, index) => (
                <TinderCard
                    user={item}
                    key={item.id}
                    numOfCards={dummuUsers.length}
                    index={index}
                    activeIndex={activeIndex}
                />
            ))}
        </SafeAreaView>
    )
}

export default TinderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})