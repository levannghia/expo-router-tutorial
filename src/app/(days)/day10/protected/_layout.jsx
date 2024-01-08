import { Slot } from "expo-router";
import React, {useEffect, useState} from "react";
import * as LocalAuthentication from 'expo-local-authentication';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from "react-native";

export default function BiometricProtectedLayout() {
    const [unlocked, setUnlocked] = useState(false);
    useEffect(() => {
        
        authenticate();
    })

    const authenticate = async () => {
        const res = await LocalAuthentication.authenticateAsync();
        if(res.success){
            setUnlocked(true);
        }
        console.log(res);
    }

    if(!unlocked){
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Inter', fontSize: 20, marginBottom: 20}}>Use Face ID to unlock</Text>
            <TouchableOpacity onPress={authenticate}>
                <FontAwesome5 name="fingerprint" size={40} color="black" />
            </TouchableOpacity>
        </View>
    }

    return <Slot/>
}