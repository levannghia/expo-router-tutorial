import { StyleSheet, Text, View, ActivityIndicator, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useCallback, useState, useRef } from 'react'
import { Stack, useFocusEffect } from 'expo-router'
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera'
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const CameraScreen = () => {
    const device = useCameraDevice('back', {
        physicalDevices: ['ultra-wide-angle-camera'],
    })
    const { hasPermission, requestPermission } = useCameraPermission()
    const [isActive, setIsActive] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [flash, setFlash] = useState('off')
    const camera = useRef(null)

    useFocusEffect(
        useCallback(() => {
            setIsActive(true);
            return () => {
                setIsActive(false);
            }
        }, [])
    )

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission])

    console.log(isActive);

    const onTakePicturePressed = async () => {
        const file = await camera.current?.takePhoto({
            flash: flash // 'auto' | 'off'
        });
        const image = await CameraRoll.save(`file://${file.path}`, {
            type: 'photo',
        })

        // console.log('photo', image);
        setPhoto(image)
    }

    const uploadPhoto = async () => {
        if (!photo) {
            return;
        }

        const result = await fetch(`file://${photo.path}`);
        const data = await result.blob();
        console.log(data);
        // upload data to your network storage (ex: s3, supabase storage, etc)
    };

    if (!hasPermission) {
        return <ActivityIndicator />
    }

    if (device == null) return <Text>Camera device not found</Text>

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isActive && !photo}
                photo={true}
            />
            {photo ?
                (<>
                    <Image source={{ uri: photo }} style={StyleSheet.absoluteFill} />
                    <FontAwesome5 name="arrow-left" size={25} color="white"
                        style={{
                            position: 'absolute',
                            top: 30,
                            left: 30
                        }}

                        onPress={() => setPhoto(undefined)}
                    />
                    <TouchableOpacity
                        onPress={uploadPhoto}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            paddingBottom: 50,
                            backgroundColor: 'rgba(0, 0, 0, 0.40)',
                        }}
                    >
                        <Text>Upload</Text>
                    </TouchableOpacity>
                </>
                )
                : (
                    <>
                        <View
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 50,
                                padding: 10,
                                borderRadius: 5,
                                backgroundColor: 'rgba(0, 0, 0, 0.40)',
                                gap: 30,
                            }}
                        >
                            <TouchableOpacity>
                                <Ionicons
                                    name={flash === 'off' ? 'ios-flash-off' : 'ios-flash'}
                                    onPress={() =>
                                        setFlash((curValue) => (curValue === 'off' ? 'on' : 'off'))
                                    }
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                        <Pressable
                            onPress={onTakePicturePressed}
                            style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                width: 75,
                                height: 75,
                                backgroundColor: 'white',
                                bottom: 50,
                                borderRadius: 75
                            }}
                        >
                        </Pressable>
                    </>
                )
            }
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({})

