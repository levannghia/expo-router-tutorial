import { FlatList, Pressable, StyleSheet, Text, View, KeyboardAvoidingView, StatusBar, Platform } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NewsTaskInput from '@Components/day15/NewsTaskInput';
import TaskListItem from '@Components/day15/TaskListItem';
import Reanimated, { CurvedTransition } from 'react-native-reanimated';

const dummyTasks = [
    {
        title: 'Setup Day15 structure',
        isFinished: true,
    },
    {
        title: 'Render a list of tasks',
        isFinished: false,
    },
    {
        title: 'Add a new task',
        isFinished: false,
    },
    {
        title: 'Change the status of a task',
        isFinished: false,
    },
    {
        title: 'Separate in 2 tabs: todo, and complete',
        isFinished: false,
    },
];

const currentHeightBar = StatusBar.currentHeight;

const TodoScreen = () => {
    const [tasks, setTasks] = useState(dummyTasks)

    const onItemPressed = (index) => {
        setTasks((pre) => {
            const updatedTast = [...pre]
            updatedTast[index].isFinished = !pre[index].isFinished;
            return updatedTast;
        });
    }

    const deleteTask = (index) => {
        setTasks((currentTasks) => {
            const updatedTast = [...currentTasks];
            updatedTast.splice(index, 1);
            return updatedTast;
        })
    }
    return (
        <KeyboardAvoidingView
            style={styles.page}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={{
                // title: 'Todo',
                // headerBackTitleVisible: false,
                headerSearchBarOptions: {
                    hideWhenScrolling: true,
                    onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
                },
                headerShown: false,
            }}
            />
            <SafeAreaView
                edges={['bottom']}
                style={{ flex: 1, paddingTop: Platform.OS === 'android' ? currentHeightBar : 0 }}
            >
                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ gap: 5, padding: 10}}
                    renderItem={({ item, index }) => (
                        <Reanimated.View layout={CurvedTransition}>
                            <TaskListItem task={item} onItemPressed={() => onItemPressed(index)} onDelete={deleteTask} />
                        </Reanimated.View>
                    )}
                    ListFooterComponent={() =>
                        <NewsTaskInput onAdd={(newTodo) => setTasks(currentTasks => [...currentTasks, newTodo])} />
                    }
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default TodoScreen

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    },

    input: {
        fontFamily: 'InterSemi',
        color: 'dimgray',
        fontSize: 15,
        flex: 1,
    },
})