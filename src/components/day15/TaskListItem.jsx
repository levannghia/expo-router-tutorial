import { StyleSheet, Text, View, Pressable, Animated } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);
const RightActions = ({ dragAnimatedValue, onDelete }) => {
    const animatedStyles = {
        transform: [
            {
                translateX: dragAnimatedValue.interpolate({
                    inputRange: [-40, 0],
                    outputRange: [0, 40],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    return (
        <AnimatedView
            style={[
                {
                    backgroundColor: 'crimson',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                },
                animatedStyles
            ]}
        >
            <MaterialCommunityIcons onPress={onDelete} name={'delete'} size={24} color={'white'} />
        </AnimatedView>
    )
}

const TaskListItem = ({ task, onItemPressed, onDelete }) => {
    return (
        <Swipeable
            renderRightActions={(progressAnimatedValue, dragAnimatedValue) => <RightActions dragAnimatedValue={dragAnimatedValue} onDelete={onDelete}/>}
        >
            <Pressable onPress={onItemPressed} style={styles.taskContainer}>
                <MaterialCommunityIcons
                    name={task.isFinished ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
                    size={24}
                    color="dimgray"
                />
                <Text style={[styles.taskTitle, { textDecorationLine: task.isFinished ? 'line-through' : 'none' }]}>{task.title}</Text>
            </Pressable>
        </Swipeable>
    )
}

export default TaskListItem

const styles = StyleSheet.create({
    taskContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    taskTitle: {
        fontFamily: 'InterSemi',
        fontSize: 15,
        color: 'dimgray',
        flex: 1,
    },
})