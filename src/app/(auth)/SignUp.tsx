import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SignUpScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const {signUp} = useAuth();
    const handleSignUp = async () =>{
        if(!email || !password){
            Alert.alert('Error',"Please fill in all fields")
        }

        if(password && password.length < 3){
            Alert.alert("Error",'Please enter a password minimum 4 chr')
        }
    } 
    return (
        <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>
                <View style={styles.form}>

                    <TextInput placeholder='Email...' placeholderTextColor={'#999'} keyboardType='email-address'
                        autoComplete='email'
                        autoCapitalize='none'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input} />


                    <TextInput placeholder='Password...' placeholderTextColor={'#999'}
                        autoComplete='password'
                        secureTextEntry
                        autoCapitalize='none'
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input} />

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign up </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.LinkButton} onPress={() => router.push('/(auth)/Login')}>
                        <Text style={styles.LinkButtonTextL}>Already have an account!
                            <Text style={styles.LinkButtonText}> Sign In</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 32,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 32,
        color: "#666"
    },
    form: {
        width: "100%"
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0"
    },
    button: {
        backgroundColor: "#0989f1",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 600,
    },
    LinkButton: {
        marginTop: 24,
        alignItems: 'center',
    },
    LinkButtonTextL: {
        color: '#666'
    },
    LinkButtonText: {
        color: "#0989f1",
        fontWeight: 'bold'
    }
})