import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Slot, router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AppWithNotificationsLayout = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    let isMounted = true;
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      redirect(response.notification);
    });

    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });


    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }

      isMounted = false;
    };
  }, []);

  function redirect(notification) {
    const url = notification.request.content.data?.url;
    if (url) {
      router.push(url);
    }
  }
  console.log('Token', expoPushToken);

  return (
    <>
      <Slot />
      {notification && (
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            left: 10,
            right: 10,
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontFamily: 'InterBold' }}>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>

          <AntDesign
            style={{ position: 'absolute', top: 10, right: 10 }}
            name="close"
            size={16}
            color="black"
            onPress={() => setNotification(undefined)}
          />
        </View>
      )}
    </>
  )
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}



export default AppWithNotificationsLayout

const styles = StyleSheet.create({})