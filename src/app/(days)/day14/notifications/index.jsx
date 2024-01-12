import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';

export default function NotificationScreen() {
  return (
    <View>
      <Text>NotificationScreen</Text>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  )
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Checkout the new Tinder! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', url: '/day6' },
    },
    trigger: { seconds: 10 },
  });
}

const styles = StyleSheet.create({})