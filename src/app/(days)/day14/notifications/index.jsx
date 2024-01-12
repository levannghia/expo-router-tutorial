import { StyleSheet, Text, View } from 'react-native'
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
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 10 },
  });
}

const styles = StyleSheet.create({})