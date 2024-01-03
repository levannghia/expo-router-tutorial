import { Stack } from "expo-router";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { AmaticSC_400Regular, AmaticSC_700Bold } from '@expo-google-fonts/amatic-sc';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedSplashScreen from '@Components/day4/AnimatedSplashScreen';
import Animated, { FadeIn } from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [appReady, setAppReady] = useState(false);
    const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

    let [fontsLoaded, fontError] = useFonts({
        Inter: Inter_400Regular,
        InterSemi: Inter_600SemiBold,
        InterBold: Inter_700Bold,
        Amatic: AmaticSC_400Regular,
        AmaticBold: AmaticSC_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            // SplashScreen.hideAsync();
            setAppReady(true);
        }
    }, [fontsLoaded, fontError])

    const showAnimatedSplash = !appReady || !splashAnimationFinished;

    if (showAnimatedSplash) {
        return (
            <AnimatedSplashScreen
                onAnimationFinish={(isCancelled) => {
                    console.log(isCancelled);
                    if (!isCancelled) {
                        setSplashAnimationFinished(true);
                    }
                }}
            />
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Animated.View style={{ flex: 1 }} entering={FadeIn}>
                <Stack
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#F9EDE3',
                        }
                    }}
                >
                    <Stack.Screen name="index" options={{ title: 'DEVember' }} />
                </Stack>
            </Animated.View>
        </GestureHandlerRootView>
    )
}