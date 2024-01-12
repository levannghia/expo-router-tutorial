import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NewsTaskInput = ({ onAdd }) => {
    const [newTask, setNewTask] = useState('')

    return (
        <View style={styles.taskContainer}>
            <MaterialCommunityIcons name='checkbox-blank-circle-outline' color={'gray'} size={24} />
            <TextInput
                // autoFocus
                value={newTask}
                onChangeText={(text) => setNewTask(text)}
                placeholder='Todo...'
                style={styles.input}
                onEndEditing={() => {
                    if (!newTask) {
                        return;
                    }
                    onAdd({ title: newTask, isFinished: false });
                    setNewTask('');
                }}
            />
        </View>
    )
}

export default NewsTaskInput

const styles = StyleSheet.create({
    taskContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    input: {
        fontFamily: 'InterSemi',
        color: 'dimgray',
        fontSize: 15,
        flex: 1,
    },
})