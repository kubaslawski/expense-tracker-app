import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { globalStyles } from "../constants/styles";

const IsLoadingHOC = (WrappedComponent) => (props) => {
    const isLoading = useSelector((state) => state.ui.isLoading);


    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={"large"} color={"white"} />
            </View>
        )
    }

    return (
        <WrappedComponent {...props} />
    )
};

export default IsLoadingHOC;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: globalStyles.colors.primary700,
        flex: 1,
        justifyContent: "center",
        padding: 24,
    }
})