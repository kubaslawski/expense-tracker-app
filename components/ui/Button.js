import { Pressable, StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../../constants/styles";

const Button = ({ children, onPress, mode, style }) => {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={[styles.button, mode === "flat" && styles.flat]}>
                    <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
};

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: globalStyles.colors.primary500,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    flat: {
        backgroundColor: "transparent",
    },
    flatText: {
        color: globalStyles.colors.primary200,
    },
    pressed: {
        backgroundColor: globalStyles.colors.primary100,
        borderRadius: 4,
        opacity: 0.75,
    }
})