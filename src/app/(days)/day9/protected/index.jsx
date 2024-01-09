import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../../context'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'

const ProtectedScreen = () => {
  const { user, setUser } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      const { data } = await axios.get('https://testlrv.praz.vn/api/auth/logout', {
        params: {
          user_id: user.data.id,
        },
        headers: {
          Authorization: 'Bearer ' + user.token
        },
      });

      console.log(data);
      if (data) {
        setUser(null);
        SecureStore.deleteItemAsync("user");
      }else{
        return null
      }

    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <View>
      <Text>ProtectedScreen</Text>
      <Button title={'Logout'} onPress={handleLogout} />
    </View>
  )
}

export default ProtectedScreen

const styles = StyleSheet.create({})