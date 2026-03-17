
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.helloWorldCol}>Hello there!</Text>
      
      <TextInput placeholder="Emails"/>
      <ActivityIndicator size={"large"}/>
      
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
