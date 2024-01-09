import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState, createContext } from 'react'
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricsContext = createContext({isUnlocked: false, authenticate: () =>{}});

const BiometricProvider = ({ children }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const authenticate = async () => {
        const enrolled = await LocalAuthentication.getEnrolledLevelAsync();
        const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        console.log('hasHardware', hasHardware);
        console.log('supported', supported);
        console.log('erolled', enrolled);
        if (!hasHardware) {
            Alert.alert('Not Supported');
            // setIsUnlocked(true);
            return;
        }
        const res = await LocalAuthentication.authenticateAsync();
        if (res.success) {
            setIsUnlocked(true);
        }
        console.log(res);
    }
    return (
        <BiometricsContext.Provider value={{isUnlocked, authenticate}}>
            {children}
        </BiometricsContext.Provider>
    )
}

export default BiometricProvider

export const useBiometrics = () => useContext(BiometricsContext);