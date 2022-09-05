import { StyleSheet, Text, TextInput, View } from "react-native";
import { globalStyles } from "../../constants/styles";

const Input = ({ label, style, textInputConfig }) => {

    const inputStyles = [styles.input];
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    };

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 16,
    },
    label: {
        color: globalStyles.colors.primary100,
        fontSize: 12,
        marginBottom: 4,
    },
    input: {
        backgroundColor: globalStyles.colors.primary100,
        borderRadius: 6,
        color: globalStyles.colors.primary700,
        fontSize: 18,
        padding: 6,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
});