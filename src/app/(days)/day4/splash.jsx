import { StyleSheet, View, Text } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native'
import { Stack } from 'expo-router'

const AnimationScreen = () => {
    const animation = useRef(null);
    // console.log(animation);
    return (
        <View style={styles.container}>
            <Stack.Screen options={{headerShown: false}}/>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: '80%',
                    maxWidth: 400,
                    // height: 200,
                    // backgroundColor: '#fff',
                }}
                source={require('@Assets/lotties/netflix.json')}
            />
        </View>
    )
}

export default AnimationScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})