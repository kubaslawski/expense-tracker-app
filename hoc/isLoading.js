import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { globalStyles } from "../constants/styles";

const IsLoadingHOC = (WrappedComponent) => (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const setLoadingState = (isComponentLoading) => {
        console.log(isComponentLoading);
        setIsLoading(isComponentLoading);
    }

    return (
        <>
            {isLoading && (
                <View style={styles.container}>
                    <ActivityIndicator size={"large"} color={"white"} />
                </View>
            )}
            <WrappedComponent {...props} setLoading={setLoadingState} />
        </>
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