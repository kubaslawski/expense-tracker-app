import { StyleSheet, Text, View } from "react-native";

const WelcomeScreen = () => {
    return (
        <View>
            <Text>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
});