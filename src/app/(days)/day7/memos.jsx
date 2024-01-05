import { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import { Audio } from 'expo-av';
import { Recording } from 'expo-av/build/Audio';
import { Stack } from 'expo-router';
import Animated, { useAnimatedStyle, withTiming, interpolate, useSharedValue } from 'react-native-reanimated';
import MemoListItem from '@Components/day7/MemoListItem';

export default function MemosScreen() {
    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [memos, setMemos] = useState([]);
    const [audioMetering, setAudioMetering] = useState([]);
    const metering = useSharedValue(-100);
    const animatedRedCircle = useAnimatedStyle(() => ({
        width: withTiming(recording ? '60%' : '100%'),
        borderRadius: withTiming(recording ? 5 : 35)
    }))

    async function startRecording() {
        try {
            setAudioMetering([]);

            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY,
                undefined,
                100
            );
            setRecording(recording);

            recording.setOnRecordingStatusUpdate((status) => {
                if (status.metering) {
                    metering.value = status.metering;
                    setAudioMetering((curVal) => [...curVal, status.metering || -100]);
                }
            });
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        if (!recording) {
            return;
        }

        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        metering.value = -100;
        if (uri) {
            setMemos((existingMemos) => [
                { uri, metering: audioMetering },
                ...existingMemos,
            ]);
        }
    }

    const animatedRecordWave = useAnimatedStyle(() => {
        const size = withTiming(
            interpolate(metering.value, [-160, -60, 0], [0, 0, -30]),
            { duration: 100 }
        );
        return {
            top: size,
            bottom: size,
            left: size,
            right: size,
            backgroundColor: `rgba(255, 45, 0, ${interpolate(
                metering.value,
                [-160, -60, -10],
                [0.7, 0.3, 0.7]
            )})`,
        };
    });

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Memos Voice' }} />
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 10 }}
                data={memos}
                renderItem={({ item }) => <MemoListItem memo={item} />}
            />
            <View style={styles.footer}>
                <View>
                    <Animated.View style={[styles.recordWave, animatedRecordWave]} />
                    <Pressable
                        style={styles.recordButton}
                        onPress={recording ? stopRecording : startRecording}
                    >
                        <Animated.View style={[styles.redCircle, animatedRedCircle]} />

                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    footer: {
        backgroundColor: 'white',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordButton: {
        width: 70,
        height: 70,
        borderRadius: 35,

        borderWidth: 3,
        borderColor: 'gray',
        padding: 3,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    redCircle: {
        backgroundColor: 'orangered',
        aspectRatio: 1,
    },
    recordWave: {
        position: 'absolute',
        top: -20,
        bottom: -20,
        left: -20,
        right: -20,
        borderRadius: 1000,
    },

    redCircle: {
        backgroundColor: 'orangered',
        aspectRatio: 1,
    },
});
