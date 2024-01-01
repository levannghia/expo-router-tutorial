import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const DayListItem = ({ item }) => {
    return (
        <Link href={'/day' + item} asChild>
            <Pressable style={styles.box}>
                <Text style={styles.text}>{item}</Text>
            </Pressable>
        </Link>
    )
}

export default DayListItem

const styles = StyleSheet.create({
    box: {
        justifyContent: 'center',
        flex: 1,
        aspectRatio: 1,
        backgroundColor: '#F9EDE3',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 20,
        borderColor: '#9b4251'
    },
    text: {
        fontSize: 50,
        color: '#9b4251',
        fontFamily: 'InterBold'
    }
})