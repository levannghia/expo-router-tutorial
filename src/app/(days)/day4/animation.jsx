import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native'
import { Stack } from 'expo-router'

const AnimationScreen = () => {
    const animation = useRef(null);
    // console.log(animation);
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Lottie Animation'}}/>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#eee',
                }}
                source={require('@Assets/lotties/netflix.json')}
            />
            <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={styles.button} onPress={() => animation.current?.play()}>
                    <Text>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => animation.current?.pause()}>
                    <Text>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => animation.current?.reset()}>
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AnimationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    button: {
        borderRadius: 20,
        padding: 8,
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 0.5,
        width: '60%',
        justifyContent: 'center'
    }
})