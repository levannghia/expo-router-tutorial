import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Message = ({ message }) => {
    return (
        <View style={[styles.message,
        {
            marginLeft: message.role === 'user' ? 'auto' : 0,
            backgroundColor: message.role === 'user' ? '#2a87ff' : '#dce7ee'
        }]}>
            <Text style={[styles.messageText, { color: message.role === 'user' ? 'white' : 'black', }]}>{message.content}</Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    message: {
        padding: 10,
        width: "80%",
    },

    messageText: {

    }
})