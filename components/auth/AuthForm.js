import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";
// redux 
import { useSelector } from "react-redux";
// components 
import Button from "../ui/Button";
import Input from "../ui/Input";

const AuthForm = ({ isLogin, onSubmit, areCredentialsValid }) => {

    const errorMessage = useSelector((state) => state.ui.errorMessage);
    const [credentials, setCredentials] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
    });

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = areCredentialsValid;

    const handleInputChange = (name, value) => {
        setCredentials((prevState) => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    const handleSubmit = () => {
        onSubmit(credentials);
    };

    return (
        <View>
            <View>
                <Input
                    invalid={emailIsInvalid}
                    label="Email Address"
                    textInputConfig={{
                        keyboardType: "email-address",
                        onChangeText: handleInputChange.bind(this, "email"),
                        value: credentials.email
                    }}
                />
                {!isLogin && (
                    <Input
                        invalid={emailsDontMatch}
                        label="Confirm Email"
                        textInputConfig={{
                            keyboardType: "email-address",
                            onChangeText: handleInputChange.bind(this, "confirmEmail"),
                            value: credentials.confirmEmail
                        }}
                    />
                )}
                <Input
                    invalid={passwordIsInvalid}
                    label="Password"
                    textInputConfig={{
                        onChangeText: handleInputChange.bind(this, "password"),
                        secureTextEntry: true,
                        value: credentials.password
                    }}
                />
                {!isLogin && (
                    <Input
                        invalid={passwordsDontMatch}
                        label="Confirm Password"
                        textInputConfig={{
                            onChangeText: handleInputChange.bind(this, "confirmPassword"),
                            secureTextEntry: true,
                            value: credentials.confirmPassword
                        }}
                    />
                )}
                <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
                <View style={styles.buttons}>
                    <Button onPress={handleSubmit}>
                        {isLogin ? "Log In" : "Sign Up"}
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default AuthForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 24,
    },
    errorContainer: {
        textAlign: "center"
    },
    errorMessage: {
        color: globalStyles.colors.error500
    },
})