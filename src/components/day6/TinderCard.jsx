import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    SharedValue,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { PanGesture, Gesture, GestureDetector } from 'react-native-gesture-handler';
import React from 'react'

const screenWidth = Dimensions.get('screen').width;
export const tinderCardWidth = screenWidth * 0.8;

const TinderCard = ({ user, numOfCards, index, activeIndex, onResponse}) => {
    const translationX = useSharedValue(0);
    const animatedCard = useAnimatedStyle(() => ({
        opacity: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [1 - 1 / 5, 1, 1]
        ),
        transform: [
            {
                scale: interpolate(
                    activeIndex.value,
                    [index - 1, index, index + 1],
                    [0.95, 1, 1]
                ),
            },
            {
                translateY: interpolate(
                    activeIndex.value,
                    [index - 1, index, index + 1],
                    [-30, 0, 0]
                ),
            },
            {
                translateX: translationX.value,
            },
            {
                rotateZ: `${interpolate(
                    translationX.value,
                    [-screenWidth / 2, 0, screenWidth / 2],
                    [-15, 0, 15]
                )}deg`,
            },
        ],
    }));

    const gesture = Gesture.Pan()
        .onChange((event) => {
            translationX.value = event.translationX;

            activeIndex.value = interpolate(
                Math.abs(translationX.value),
                [0, 500],
                [index, index + 0.8]
            );
        })
        .onEnd((event) => {
            if (Math.abs(event.velocityX) > 400) {
                translationX.value = withSpring(Math.sign(event.velocityX) * 500, {
                    velocity: event.velocityX,
                });
                activeIndex.value = withSpring(index + 1);

                runOnJS(onResponse)(event.velocityX > 0);
            } else {
                translationX.value = withSpring(0);
            }
        });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[
                    styles.card,
                    animatedCard,
                    {
                        opacity: 1 - index * 0.2,
                        zIndex: numOfCards - index,
                        transform: [
                            { translateY: -index * 30 },
                            { scale: 1 - index * 0.05 },
                        ]
                    }
                ]}
            >
                <Image style={[StyleSheet.absoluteFillObject, styles.image]} source={{ uri: user.image }} />
                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={[styles.overlay, StyleSheet.absoluteFill]}
                />
                <View style={styles.footer}>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
            </Animated.View>
        </GestureDetector>
    )
}

export default TinderCard

const styles = StyleSheet.create({
    card: {
        width: tinderCardWidth,
        aspectRatio: 1 / 1.67,
        borderRadius: 15,
        justifyContent: 'flex-end',
        position: 'absolute',
        // shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    image: {
        // objectFit: 'cover',
        // width: '100%',
        // height: '100%'
        borderRadius: 15,
    },
    overlay: {
        top: '50%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    footer: {
        padding: 10,
    },
    name: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'InterBold',
    },
})