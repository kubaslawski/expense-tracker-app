import { View, Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ color, icon, onPress, size }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons color={color} name={icon} size={size} />
            </View>
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        marginHorizontal: 8,
        marginVertical: 2,
        padding: 6,
    },
    pressed: {
        opacity: 0.75,
    },
})