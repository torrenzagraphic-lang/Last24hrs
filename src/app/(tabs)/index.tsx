import { Button } from '@expo/ui/jetpack-compose';
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.helloWorldCol}>Hello there!</Text>
      
      <TextInput placeholder="Emails"/>
      <ActivityIndicator size={"large"}/>
      <Link href={'/about'}>Go about</Link>
      <Button onPress={() => router.push('/about')}>
        <Text>Button</Text>
      </Button>
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
