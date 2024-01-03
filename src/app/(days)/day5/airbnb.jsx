import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Stack } from 'expo-router';
import CustomMarker from '@Components/day5/CustomMarker';
import apartments from '@Assets/data/day5/apartments.json'
import ApartmentListItem from '@Components/day5/ApartmentListItem';

const AirbnbScreen = () => {
    // console.log(apartments);
    const [selectedApartment, setSelectedApartment] = useState(null)
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {apartments.map((apartment, index) => (
                    <CustomMarker key={index} apartment={apartment}/>
                ))}
            </MapView>
            <ApartmentListItem apartment={apartments[0]}/>
        </View>
    )
}

export default AirbnbScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
})