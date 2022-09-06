import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";
import Button from "./Button";

const ErrorOverlay = ({ message, onConfirm }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An Error Occured</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
};

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: globalStyles.colors.primary700,
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    text: {
        color: "white",
        marginBottom: 8,
        textAlign: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
})