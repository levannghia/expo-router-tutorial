import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import { Stack, useFocusEffect } from 'expo-router'
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera'

const CameraScreen = () => {
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    const [isActive, setIsActive] = useState(false)
    // const isFocused = useIsFocused()
    // const appState = useAppState()
    // const isActive = isFocused && appState === "active"

    useFocusEffect(() => {
        useCallback(() => {
            setIsActive(true);
            return () => {
                setIsActive(false);
            }
        }, [])
    })

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission])

    console.log(isActive);

    if (!hasPermission) {
        return <ActivityIndicator />
    }

    if (device == null) return <Text>Camera device not found</Text>

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Camera
                // style={StyleSheet.absoluteFill}
                device={device}
                isActive={isActive}
            />
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({})

