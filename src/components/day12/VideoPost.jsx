import { StyleSheet, Text, View, SafeAreaView, Pressable, useWindowDimensions, StatusBar, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const statusbarHeight = StatusBar.currentHeight
const VideoPost = ({ post, activePostId }) => {
    const { height } = useWindowDimensions();
    // console.log(height);
    const [status, setStatus] = useState()
    const isPlaying = status?.isLoaded && status.isPlaying;
    const videoRef = useRef(null)
    // console.log(status);
    const onPress = () => {
        if (!videoRef.current) {
            return;
        }

        if (isPlaying) {
            videoRef.current.pauseAsync();
        } else {
            videoRef.current.playAsync();
        }
    }

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }
        if (activePostId !== post.id) {
            videoRef.current.pauseAsync();
        }
        if (activePostId === post.id) {
            videoRef.current.playAsync();
        }
    }, [activePostId, videoRef.current])

    return (
        <View style={[styles.container, { height: Platform.OS == 'android' ? height + statusbarHeight : height }]}>
            <Video
                isLooping
                ref={videoRef}
                style={[StyleSheet.absoluteFill, styles.video]}
                source={{ uri: post.video }}
                resizeMode={ResizeMode.COVER}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <Pressable style={styles.content} onPress={onPress}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={[StyleSheet.absoluteFillObject, styles.overlay]}
                />
                {!isPlaying && (
                    <Ionicons
                        style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
                        name="play"
                        size={70}
                        color="rgba(255, 255, 255, 0.6)"
                    />
                )}
                <SafeAreaView style={{ flex: 1, }}>
                    <View style={styles.footer}>
                        {/* bottom: caption */}
                        <View style={styles.leftColumn}>
                            <Text style={styles.caption}>{post.caption}</Text>
                        </View>

                        {/* Vertical column of icon-buttons */}
                    </View>
                    <View style={[styles.rightColumn, { top: height * 0.6 }]}>
                        <Ionicons name="heart" size={35} color="white" />
                        <Ionicons name="share-social-sharp" size={35} color="white" />
                        <Ionicons name="bookmark" size={35} color="white" />
                    </View>
                </SafeAreaView>
            </Pressable>
        </View>
    )
}

export default VideoPost

const styles = StyleSheet.create({
    container: {

    },
    video: {

    },
    content: {
        flex: 1,
        padding: 10
    },
    overlay: {
        top: '70%',
    },

    footer: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    leftColumn: {
        flex: 1,
    },
    caption: {
        color: 'white',
        fontFamily: 'Inter',
        fontSize: 18,
    },
    rightColumn: {
        position: 'absolute',
        right: 0,
        gap: 10,
    },

})