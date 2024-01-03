import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps';

const CustomMarker = ({apartment}) => {
    return (
        <Marker
            coordinate={{
                latitude: apartment.latitude,
                longitude: apartment.longitude,
            }}
            title={apartment.title}
            description='Hello there'
        >
            <View style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                padding: 3,
                paddingHorizontal: 8,
                borderColor: 'gray',
                borderRadius: 10,
            }}>
                <Text style={{
                    fontFamily: 'InterBold'
                }}>
                    $ {apartment.price}
                </Text>
            </View>
        </Marker>
    )
}

export default CustomMarker

const styles = StyleSheet.create({})