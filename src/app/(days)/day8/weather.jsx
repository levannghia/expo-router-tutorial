import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router';
import * as Location from 'expo-location';
import ForeCastItem from '@Components/day8/ForeCastItem';

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const apiKey = 'bd3d35ab9e82916d2e8f5996019766a5';

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
    // console.log(JSON.stringify(data, null, 2));
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
    console.log(JSON.stringify(data, null, 2));
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
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Weather App' }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
      </View>
      <FlatList
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
  )
}

export default WeatherScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  location: {
    fontFamily: 'Inter',
    fontSize: 25,
  },
  temp: {
    fontFamily: 'InterBold',
    fontSize: 60,
    color: 'gray'
  }
})