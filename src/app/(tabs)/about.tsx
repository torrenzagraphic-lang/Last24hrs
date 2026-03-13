import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";


export default function About() {
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://imgs.search.brave.com/yq72cjuqfTD5vPKoVQwO6QtMHK1xZCT6A26QdrFD0lc/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/TjdVOWYtZkVvLUFB/QUFBTS9kb2ctb2gt/cmVhbGx5LmdpZg.jpeg' }}
                style={styles.image}
            />
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
