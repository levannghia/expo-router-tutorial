import { StyleSheet, View, Text } from 'react-native'
import React, { useState, useRef, useMemo } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Stack } from 'expo-router';
import CustomMarker from '@Components/day5/CustomMarker';
import apartments from '@Assets/data/day5/apartments.json'
import ApartmentListItem from '@Components/day5/ApartmentListItem';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Gesture } from 'react-native-gesture-handler';

const AirbnbScreen = () => {
    const bottomSheetRef = useRef(null);
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [selectedApartment, setSelectedApartment] = useState(null)
    const snapPoints = useMemo(() => [80, '50%', '90%'], []);
    // const gestureHandle = Gesture.Pan()
    // .onBegin((event) => console.log("begin: ", event))
    // .onUpdate((event) => console.log("update: ", event))

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                // initialRegion={mapRegion}
                region={mapRegion}
            >
                {apartments.map((apartment, index) => (
                    <CustomMarker key={index} apartment={apartment} onPress={() => setSelectedApartment(apartment)} />
                ))}
            </MapView>
            {selectedApartment && <ApartmentListItem apartment={selectedApartment} style={styles.selectedContainer} />}
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                // gestureEventsHandlersHook={gestureHandle}
                onChange={(index) => console.log("On Change: " + index)}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.listTitle}>Over {apartments.length} places</Text>
                    <BottomSheetFlatList
                        data={apartments}
                        contentContainerStyle={{ gap: 10, padding: 10 }}
                        renderItem={({ item }) => <ApartmentListItem apartment={item} />}
                    />
                </View>
            </BottomSheet>
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
    listTitle: {
        textAlign: 'center',
        fontFamily: 'InterSemi',
        fontSize: 16,
        marginVertical: 5,
        marginBottom: 20,
    },
    selectedContainer: {
        position: 'absolute',
        bottom: 100,
        right: 10,
        left: 10,
    },
})