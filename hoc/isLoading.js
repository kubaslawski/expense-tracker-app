import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { globalStyles } from "../constants/styles";

const IsLoadingHOC = (WrappedComponent) => (props) => {
    const isLoading = useSelector((state) => state.ui.isLoading);

    return (
        <>
            {isLoading && (
                <View style={styles.container}>
                    <ActivityIndicator size={"large"} color={"white"} />
                </View>
            )}
            <WrappedComponent {...props} />
        </>
    )
};

export default IsLoadingHOC;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: globalStyles.colors.primary700,
        minHeight: "100%",
        justifyContent: "center",
        padding: 24,
    }
})