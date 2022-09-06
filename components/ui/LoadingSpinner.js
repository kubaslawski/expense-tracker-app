import { ActivityIndicator, StyleSheet, View } from "react-native";
import { globalStyles } from "../../constants/styles";

const LoadingSpinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={"white"} />
        </View>
    )
};

export default LoadingSpinner;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: globalStyles.colors.primary700,
        flex: 1,
        justifyContent: "center",
        padding: 24,
    }
})