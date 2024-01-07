import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../../context'
import * as SecureStore from 'expo-secure-store'

const ProtectedScreen = () => {
  const {user, setUser} = useContext(AuthContext)

  const handleLogout = async () => {
    setUser(null);
    SecureStore.deleteItemAsync("user");
  }
  
  return (
    <View>
      <Text>ProtectedScreen</Text>
      <Button title={'Logout'} onPress={handleLogout}/>
    </View>
  )
}

export default ProtectedScreen

const styles = StyleSheet.create({})