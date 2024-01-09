import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useCameraPermission, useCameraDevice } from 'react-native-vision-camera'

const CameraScreen = () => {
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    console.log(hasPermission);
    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission])

    if (!hasPermission) {
        return <ActivityIndicator />
    }

    
  if (device == null) return <Text>Camera device not found</Text>

    return (
        <View>
            <Stack.Screen options={{ headerShown: false }} />
            <Camera
                // style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({})

