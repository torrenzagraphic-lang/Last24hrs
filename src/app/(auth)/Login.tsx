import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, SetIsLoading] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
        }

        SetIsLoading(true);
        try {
            await signIn(email, password);
            router.push("/(tabs)");
        } catch (error) {
            Alert.alert("Error", "Failed to Login. Please try again");
        } finally {
            SetIsLoading(false);
        }
    };

    return (
        <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign In to continue</Text>
                <View style={styles.form}>
                    <TextInput
                        placeholder="Email..."
                        placeholderTextColor={"#999"}
                        keyboardType="email-address"
                        autoComplete="email"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Password..."
                        placeholderTextColor={"#999"}
                        autoComplete="email"
                        secureTextEntry
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        {isLoading ? (
                            <ActivityIndicator size={24} color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Login </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.LinkButton}
                        onPress={() => router.push("/(auth)/SignUp")}
                    >
                        <Text style={styles.LinkButtonTextL}>
                            Don't have an account?
                            <Text style={styles.LinkButtonText}> Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
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
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 32,
        color: "#666",
    },
    form: {
        width: "100%",
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
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
        alignItems: "center",
    },
    LinkButtonTextL: {
        color: "#666",
    },
    LinkButtonText: {
        color: "#0989f1",
        fontWeight: "bold",
    },
});
