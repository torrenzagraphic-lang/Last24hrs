import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SignUpScreen() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [isloading, setIsLoading] = useState("");
    const [profile, setProfile] = useState("");

    const pickImage = async() =>{
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== 'granted'){
            Alert.alert(
                "Permission needed",
                "We need camera roll permission to select a profile image."
            );
            return;
        }


        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:['images'],
            allowsEditing:true,
            aspect:[1,1],
            quality:0.8,
        });
        if(!result.canceled && result.assets[0]){
            setProfile(result.assets[0].uri)
        }
    }

    const handleComplete = () => {

    };
    return (
        <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Complete Your Profile</Text>
                    <Text style={styles.subtitle}>
                        Add your information to get started
                    </Text>
                </View>

                <View style={styles.form}>
                    <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                        <View style={styles.placeholderImage}>
                            <Text style={styles.placeholderText}>+</Text>
                        </View>
                        <View style={styles.editBadge}>
                            <Text style={styles.editText}>Edit</Text>
                        </View>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder='Full Name'
                        placeholderTextColor={'#999'}
                        value={name}
                        onChangeText={setName}
                        autoCapitalize='words'
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='UserName'
                        placeholderTextColor={'#999'}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize='words'
                    />
                    <TouchableOpacity style={styles.button} onPress={handleComplete}>
                        {isloading ? (
                            <ActivityIndicator size={24} color='#fff' />
                        ) : (
                            <Text style={styles.buttonText}>Good 2 Go </Text>
                        )}
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
    header: {
        marginBottom: 32,
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
        width: "100%",
        alignItems: 'center',
    },
    imageContainer: {
        marginBottom: 32,
        position: 'relative',
    },
    placeholderImage: {
        width: 120,
        height: 120,
        backgroundColor: '#f5f5f5',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 2,
        borderColor: '#e0e0e0',
        borderStyle: 'dashed'
    },
    placeholderText: {
        fontSize: 48,
        color: '#999'
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#0989f1',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    editText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        width: '100%'
    },
    button: {
        backgroundColor: "#0989f1",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        width:'100%'
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