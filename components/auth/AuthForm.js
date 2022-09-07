import { useState } from "react";
import { StyleSheet, View } from "react-native";

// components 
import Button from "../ui/Button";
import Input from "../ui/Input";

const AuthForm = ({ isLogin, onSubmit, areCredentialsValid }) => {
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
                        keyboardType="email-address",
                        onChangeText: handleInputChange.bind(this, "email"),
                        value: credentials.email
                    }}
                />
                {!isLogin && (
                    <Input
                        invalid={emailsDontMatch}
                        label="Confirm Email"
                        textInputConfig={{
                            keyboardType="email-address",
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
                        secureEntryText: true,
                        value: credentials.password
                    }}
                />
                {!isLogin && (
                    <Input
                        invalid={passwordsDontMatch}
                        label="Confirm Password"
                        textInputConfig={{
                            onChangeText: handleInputChange.bind(this, "confirmPassword"),
                            secureEntryText: true,
                            value: credentials.confirmPassword
                        }}
                    />
                )}
                <View style={styles.button}>
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
        marginTop: 12,
    }
})