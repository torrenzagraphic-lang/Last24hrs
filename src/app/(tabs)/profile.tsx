
import { StyleSheet, Text, View } from "react-native";


export default function Profile() {
    return (
        <View style={styles.container}>
           <Text>Profile Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    helloWorldCol: {
        color: "red",
    },
    image: {
        height: 200,
        width: 200,
    }
});
