import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const TaskListItem = ({ task, onItemPressed }) => {
    return (
        <Swipeable
            renderRightActions={() => (
                <View
                    style={{
                        backgroundColor: 'crimson',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <MaterialCommunityIcons name={'delete'} size={24} color={'white'} />
                </View>
            )}
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