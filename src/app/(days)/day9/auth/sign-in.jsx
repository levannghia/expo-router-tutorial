import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'expo-router';
import axios from 'axios';
import { AuthContext } from '../../../../../context';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useContext(AuthContext);

    const onSignInPressed = async () => {
        setError('');
        try {
            const { data } = await axios.post('https://testlrv.praz.vn/api/auth/login', {
                email: email,
                password: password,
            })
            // console.log("data: ", data);
            if (data) {
                if (data.data) {
                    let stringUser = JSON.stringify(data.data);
                    setUser(data.data);
                    SecureStore.setItemAsync("user", stringUser);
                    router.replace('/day9/protected');
                } else if (data.message) {
                    setError(data.message);
                }
            }
        } catch (e) {
            setError(e.message);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="jon@acme.com"
                style={styles.input}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            <Button title="Sign in" onPress={onSignInPressed} />
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <Link href={'/day9/auth/sign-up'}>New here? Sign up</Link>
        </View>
    );
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontFamily: 'InterSemi',
        fontSize: 24,
        color: 'dimgray',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
});