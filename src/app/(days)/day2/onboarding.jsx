import { StyleSheet, Text, View, SafeAreaView, Pressable, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import Animated, {
    FadeIn,
    FadeOut,
    BounceInRight,
    SlideOutLeft,
    BounceOutLeft,
    SlideInRight,
} from 'react-native-reanimated';

const statusBarHeight = StatusBar.currentHeight;
const onboardingSteps = [
    {
        icon: 'snowflake',
        title: 'Welcome #DEVember',
        description: 'Daily React Native tutorials during December',
    },
    {
        icon: 'people-arrows',
        title: 'Learn and grow together',
        description: 'Learn by building 24 projects with React Native and Expo',
    },
    {
        icon: 'book-reader',
        title: 'Education for Children',
        description:
            'Contribute to the fundraiser "Education for Children" to help Save the Children in their effort of providing education to every child',
    },
];

const OnboardingScreen = () => {
    const [screenIndex, setScreenIndex] = useState(0);
    const data = onboardingSteps[screenIndex];

    const onContinue = () => {
        const isLastScreen = screenIndex === onboardingSteps.length - 1;
        if (isLastScreen) {
            endOnboarding();
        } else {
            setScreenIndex(screenIndex + 1);
        }
    };

    const onBack = () => {
        const isFirstScreen = screenIndex === 0;
        if (isFirstScreen) {
            endOnboarding();
        } else {
            setScreenIndex(screenIndex - 1);
        }
    };

    const endOnboarding = () => {
        setScreenIndex(0);
        router.back();
    };

    const swipeForward = Gesture.Fling().direction(Directions.LEFT)
        // .onBegin((event) => {
        //     console.log('begin ', event.state);
        // })
        .onEnd(onContinue)

    const swipeBack = Gesture.Fling().direction(Directions.RIGHT)
        .onEnd(onBack)

    const swipes = Gesture.Simultaneous(
      swipeBack, swipeForward
    );

    return (
        <SafeAreaView style={styles.page}>
            <StatusBar barStyle={'light-content'} />
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.stepIndicatorContainer}>
                {onboardingSteps.map((step, index) => (
                    <View key={index} style={[styles.stepIndicator, { backgroundColor: index == screenIndex ? '#cef202' : 'gray' }]} />
                ))}
            </View>
            <GestureDetector gesture={swipes}>
                <View style={styles.pageContent} key={screenIndex}>
                    <Animated.View entering={FadeIn} exiting={FadeOut}>
                        <FontAwesome5
                            style={styles.image}
                            name={data.icon}
                            size={150}
                            color="#CEF202"
                        />
                    </Animated.View>
                    <View style={styles.footer}>
                        <Animated.Text
                            entering={SlideInRight}
                            exiting={SlideOutLeft}
                            style={styles.title}
                        >
                            {data.title}
                        </Animated.Text>
                        <Animated.Text
                            entering={SlideInRight.delay(50)}
                            exiting={SlideOutLeft}
                            style={styles.description}
                        >
                            {data.description}
                        </Animated.Text>
                        <View style={styles.buttonRow}>
                            <Text onPress={endOnboarding} style={styles.buttonText}>Skip</Text>
                            <Pressable onPress={onContinue} style={styles.button}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </GestureDetector>
        </SafeAreaView>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    page: {
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
        margin: 50,
    },
    description: {
        fontFamily: 'Inter',
        color: 'gray',
        fontSize: 18.5,
        lineHeight: 26
    },

    footer: {
        marginTop: 'auto',
    },
    buttonRow: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#302e38',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        padding: 15,
        paddingHorizontal: 25,
        color: '#FDFDFD',
        fontFamily: 'InterBold'
    },
    stepIndicatorContainer: {
        flexDirection: 'row',
        marginTop: statusBarHeight,
        gap: 8,
        padding: 25
    },
    stepIndicator: {
        flex: 1,
        height: 3,
        backgroundColor: 'gray',
        borderRadius: 10,
    }
})