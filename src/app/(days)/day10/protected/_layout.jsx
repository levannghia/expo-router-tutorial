import { Slot } from "expo-router";
import React, { useEffect, useContext } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from "react-native";
import { useBiometrics } from "@Components/day10/BiometricProvider";

export default function BiometricProtectedLayout() {
    const {isUnlocked, authenticate} = useBiometrics()
    useEffect(() => {
        if (!isUnlocked) {
            authenticate();
        }
    })


    if (!isUnlocked) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Inter', fontSize: 20, marginBottom: 20 }}>Use Vân tay to Unlock</Text>
                <TouchableOpacity onPress={authenticate}>
                    <FontAwesome5 name="fingerprint" size={40} color="black" />
                </TouchableOpacity>
            </View>
        )
    }

    return <Slot />
}