import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/Client";
import { uploadImageProfileImage } from "@/lib/supabase/Storage";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
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

export default function SignUpScreen() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<string | null>(null);
    const { user, updateUser } = useAuth();
    const router = useRouter();
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission needed",
                "We need camera roll permission to select a profile image.",
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled && result.assets[0]) {
            setProfile(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission needed",
                "We need camera permission to take a photo.",
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled && result.assets[0]) {
            setProfile(result.assets[0].uri);
        }
    };

    const showImagePicker = () => {
        Alert.alert("Select Profile Image", "Choose an option", [
            { text: "Camera", onPress: takePhoto },
            { text: "Upload from Media", onPress: pickImage },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const handleComplete = async () => {
        if (!name || !username) {
            Alert.alert("Error", "Please fill in all fields");
        }

        if (username.length < 3) {
            Alert.alert("Error", "Please enter a username minimum 4 chr");
        }

        setIsLoading(true);
        try {
            if (!user) {
                throw new Error("User not authenticated");
            }

            const { data: existingUser } = await supabase
                .from("profiles")
                .select("id")
                .eq("username", username)
                .neq("id", user.id)
                .single();

            if (existingUser) {
                Alert.alert(
                    "Error",
                    "This username is already taken, Please choose another one.",
                );
                setIsLoading(false);
                return;
            }

            //Uploading Profile Image
            let profileImageUrl: string | undefined;
            if (profile) {
                try {
                    profileImageUrl = await uploadImageProfileImage(user?.id, profile);
                } catch (error) {
                    console.error("Error uploading profile image",error)
                    Alert.alert(
                        "Warning",
                        "Failed to upload profile image. Continuing without image.",
                    );
                }
            }

            //Update Profile Image

            await updateUser({
                name,
                username,
                profileImage: profileImageUrl,
                onboardingCompleted: true,
            });
            router.replace('/(tabs)')

        } catch (error) {
            Alert.alert("Error", "Failed to complete onboarding. Please try again");

            setIsLoading(false);
            return;
        } finally {
            setIsLoading(false);
        }
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
                    <TouchableOpacity
                        style={styles.imageContainer}
                        onPress={showImagePicker}
                    >
                        {profile ? (
                            <Image source={{ uri: profile }} style={styles.profile} />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Text style={styles.placeholderText}>+</Text>
                            </View>
                        )}
                        <View style={styles.editBadge}>
                            <Text style={styles.editText}>Edit</Text>
                        </View>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor={"#999"}
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="UserName"
                        placeholderTextColor={"#999"}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="words"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleComplete}>
                        {isloading ? (
                            <ActivityIndicator size={24} color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Good 2 Go </Text>
                        )}
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
    header: {
        marginBottom: 32,
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
        alignItems: "center",
    },
    imageContainer: {
        marginBottom: 32,
        position: "relative",
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#f5f5f5",
    },
    placeholderImage: {
        width: 120,
        height: 120,
        backgroundColor: "#f5f5f5",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        borderWidth: 2,
        borderColor: "#e0e0e0",
        borderStyle: "dashed",
    },
    placeholderText: {
        fontSize: 48,
        color: "#999",
    },
    editBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#0989f1",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    editText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        width: "100%",
    },
    button: {
        backgroundColor: "#0989f1",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        width: "100%",
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
