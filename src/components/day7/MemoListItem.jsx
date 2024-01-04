import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MemoListItem = ({uri}) => {
  return (
    <View>
      <Text>{uri}</Text>
    </View>
  )
}

export default MemoListItem

const styles = StyleSheet.create({})