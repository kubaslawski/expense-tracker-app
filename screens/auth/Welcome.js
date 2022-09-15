import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// redux 
import { useSelector } from "react-redux";
// hoc 
import IsLoadingHOC from "../../hoc/isLoading";
// others 
import axios from "axios";

const WelcomeScreen = () => {

    const token = useSelector((state) => state.user.token);

    return (
        <View>
            <Text>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
        </View>
    );
};

export default IsLoadingHOC(WelcomeScreen);

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