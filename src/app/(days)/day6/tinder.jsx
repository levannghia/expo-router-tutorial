import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import TinderCard from '@Components/day6/TinderCard'
import { Stack } from 'expo-router'
import { useSharedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated'
// import { PanGesture, GestureDetector, Gesture } from 'react-native-gesture-handler';

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

// const gesture = Gesture.Pan()
//                 .onBegin((event) => console.log('onBegin'))
//                 .onFinalize((event) => console.log('onFinalize'))
//                 .onChange((event) => console.log('onChange'))
//                 .onStart((event) => console.log('onStart'))
//                 .onUpdate((event) => console.log('onUpdate: ', event.translationX))
//                 .onEnd((event) => console.log('onEnd'));

const TinderScreen = () => {
    const [users, setUsers] = useState(dummuUsers);
    const activeIndex = useSharedValue(0);
    const [index, setIndex] = useState(0);

    useAnimatedReaction(
        () => activeIndex.value,
        (value, prevValue) => {
            if (Math.floor(value) !== index) {
                runOnJS(setIndex)(Math.floor(value));
            }
        }
    );

    const onResponse = (res) => {
        console.log('on Response: ', res);
    };

    useEffect(() => {
        if (index > users.length - 3) {
            console.warn('Last 2 cards remining. Fetch more!');
            setUsers((usrs) => [...usrs, ...dummuUsers.reverse()]);
        }
    }, [index]);

    return (

        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={{ top: 30, position: 'absolute' }}>
                Current index: {index}
            </Text>
            {users.map((item, index) => (
                <TinderCard
                    user={item}
                    key={`${item.id}-${index}`}
                    numOfCards={users.length}
                    index={index}
                    activeIndex={activeIndex}
                    onResponse={onResponse}
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