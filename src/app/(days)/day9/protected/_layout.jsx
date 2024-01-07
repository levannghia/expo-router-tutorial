import { Slot } from "expo-router"
import React, {useContext} from "react"
import { View } from "react-native"
import { Redirect } from 'expo-router'
import { AuthContext } from "../../../../../context"

export default function ProtectedLayout() {
    const { user } = useContext(AuthContext);
    console.log(user);
    if (!user) {
        return <Redirect href={'/day9/auth/sign-in'} />
    }

    return <Slot />
}