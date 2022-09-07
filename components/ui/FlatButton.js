import { Pressable, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";

const FlatButton = ({ children, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.buttonText}>
                    {children}
                </Text>
            </View>
        </Pressable>
    );
};

export default FlatButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    pressed: {
        opacity: 0.75,
    },
    buttonText: {
        color: globalStyles.colors.primary100,
        textAlign: "center",
    },
});