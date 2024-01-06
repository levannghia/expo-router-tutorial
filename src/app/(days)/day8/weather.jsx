import { StyleSheet, Text, View, ActivityIndicator, FlatList, ImageBackground, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router';
import * as Location from 'expo-location';
import ForeCastItem from '@Components/day8/ForeCastItem';
import LottieView from 'lottie-react-native';

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const apiKey = 'bd3d35ab9e82916d2e8f5996019766a5';
const bgImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg';

const WeatherScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location: ", location);
      setLocation(location);
    })();
  }, []);

  const fetchWeather = async () => {
    if (!location) {
      return;
    }
    const lon = location?.coords.longitude;
    const lat = location?.coords.latitude;
    const resuilt = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`);
    const data = await resuilt.json();
    console.log(JSON.stringify(data, null, 2));
    setWeather(data);
  }

  const fetchForeCast = async () => {
    if (!location) {
      return;
    }
    const numberOfDays = 5;
    const lon = location?.coords.longitude;
    const lat = location?.coords.latitude;
    const resuilt = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&cnt=${numberOfDays}&appid=${apiKey}&units=metric&lang=vi`);
    const data = await resuilt.json();
    // console.log(JSON.stringify(data, null, 2));
    setForecast(data.list)
  }

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForeCast();
    }
  }, [location]);

  if (!weather) {
    return <ActivityIndicator />
  }

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={
              weather.weather[0].main === 'Rain'
                ? require('@Assets/lotties/rain.json')
                : require('@Assets/lotties/sunny.json')
            }
            style={{
              width: 200,
              aspectRatio: 1,
            }}
            loop
            autoPlay
          />
          <Text style={styles.location}>{weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
          <Text style={styles.location}>{weather.weather[0].description}</Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={forecast}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 10,
          }}
          style={{
            flexGrow: 0,
            height: 150,
            marginBottom: 40,
          }}
          keyExtractor={(item) => item.dt}
          renderItem={({ item }) => (
            <ForeCastItem forecast={item} />
          )}
        />
      </View>
    </ImageBackground>
  )
}

export default WeatherScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  location: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 25,
  },
  temp: {
    fontFamily: 'InterBold',
    fontSize: 60,
    color: 'white'
  }
})