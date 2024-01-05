import { StyleSheet, Text, View, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react'
import { AVPlaybackStatus, Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import Animated, { useAnimatedStyle, withTiming, interpolate, Extrapolate } from 'react-native-reanimated';

const MemoListItem = ({ memo }) => {
  console.log(memo);
  const [sound, setSound] = useState();
  const [status, setStatus] = useState();

  async function loadSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      { uri: memo.uri },
      { progressUpdateIntervalMillis: 1000 / 60 },
      onPlaybackStatusUpdate
    );
    setSound(sound);
  }

  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const position = status?.isLoaded ? status.positionMillis : 0;
  const totalDuration = status?.isLoaded ? status.durationMillis : 0;

  const progress = position / totalDuration;

  const formatMilis = (milis) => {
    const minutes = Math.floor(milis / (1000 * 60));
    const seconds = Math.floor((milis % (1000 * 60)) / 1000);

    return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
  }

  const onPlaybackStatusUpdate = useCallback(
    async (newStatus) => {
      // console.log(JSON.stringify(newStatus, null, 2));
      setStatus(newStatus);

      if (!newStatus.isLoaded) {
        return;
      }

      if (newStatus.didJustFinish) {
        console.warn('should restart');
        // sound?.setStatusAsync({positionMillis: 0})
        await sound?.setPositionAsync(0)
      }
    }, [sound]
  )

  useEffect(() => {
    loadSound();
  }, [memo])

  async function playSound() {
    if (!sound) {
      return;
    }
    console.log('Playing Sound');
    // await sound.playAsync();
    if (!status?.isLoaded && status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.replayAsync();
    }
  }

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    left: `${progress * 100}%`,
    // withTiming(`${progress * 100}%`, {
    //   duration:
    //     (status?.isLoaded && status.progressUpdateIntervalMillis) || 100,
    // }),
  }));

  let numLines = 50;
  let lines = [];

  for (let i = 0; i < numLines; i++) {
    const meteringIndex = Math.floor((i * memo.metering.length) / numLines);
    const nextMeteringIndex = Math.ceil(
      ((i + 1) * memo.metering.length) / numLines
    );
    const values = memo.metering.slice(meteringIndex, nextMeteringIndex);
    const average = values.reduce((sum, a) => sum + a, 0) / values.length;
    // lines.push(memo.metering[meteringIndex]);
    lines.push(average);
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  return (
    <View style={styles.container}>
      <Pressable onPress={playSound}>
        <FontAwesome5 name={isPlaying ? "pause" : "play"} size={20} color="gray" />
      </Pressable>
      <View style={styles.playbackContainer}>
        {/* <View style={styles.playbackBackground}></View> */}
        <View style={styles.wave}>
          {lines.map((db, index) => (
            <View
              key={index}
              style={[
                styles.waveLine,
                {
                  height: interpolate(db, [-60, 0], [5, 50], Extrapolate.CLAMP),
                  backgroundColor:
                    progress > index / lines.length ? 'royalblue' : 'gainsboro',
                },
              ]}
            />
          ))}
        </View>
        {/* <Animated.View style={[styles.playbackIndicator, animatedIndicatorStyle]}></Animated.View> */}
        <Text style={{ position: 'absolute', right: 0, bottom: 0, color: 'gray', fontFamily: 'Inter', fontSize: 13 }}>
          {formatMilis(position || 0)} / {formatMilis(totalDuration || 0)}
        </Text>
      </View>
    </View>
  )
}

export default MemoListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 15,

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

  playbackContainer: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
  },
  playbackBackground: {
    height: 3,
    backgroundColor: 'gainsboro',
    borderRadius: 5,
  },
  playbackIndicator: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: 'royalblue',
    position: 'absolute',
  },

  wave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  waveLine: {
    flex: 1,
    height: 30,
    backgroundColor: 'gainsboro',
    borderRadius: 20,
  },
})