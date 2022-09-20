import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// components 
import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
// functions 
import { isEmail, isEmpty } from "../../util/validators/validators";
import { globalStyles } from "../../constants/styles";


const AuthContent = ({ isLogin, onAuthenticate }) => {

    const navigation = useNavigation();

    const [areCredentialsValid, setAreCredentialsValid] = useState({
        email: false,
        confirmEmail: false,
        password: false,
        confirmPassword: false,
    });

    const switchAuthModeHandler = () => {
        if (isLogin) {
            navigation.replace("SignUpScreen");
        } else {
            navigation.replace("LoginScreen");
        }
    };

    const submitHandler = (credentials) => {
        let { email, confirmEmail, password, confirmPassword } = credentials;
        email = email.trim();
        password = password.trim();

        const isEmailValid = (!isEmpty(email) && isEmail(email));
        const isPasswordValid = password.length > 6;
        const areEmailsEqual = email === confirmEmail;
        const arePasswordsEqual = password === confirmPassword;

        if (
            !isEmailValid ||
            !isPasswordValid ||
            (!isLogin && (!areEmailsEqual || !arePasswordsEqual))
        ) {
            Alert.alert("Invalid inputs", "Please check your entered credentials.");
            setAreCredentialsValid({
                email: !isEmailValid,
                password: !isPasswordValid,
                confirmEmail: !isEmailValid || !areEmailsEqual,
                confirmPassword: !isPasswordValid || !arePasswordsEqual,
            });
            return;
        }
        onAuthenticate(credentials);
    };

    return (
        <View style={styles.container}>
            <AuthForm
                areCredentialsValid={areCredentialsValid}
                isLogin={isLogin}
                onSubmit={submitHandler}
            />
            <View style={styles.buttons}>
                <FlatButton onPress={switchAuthModeHandler}>
                    {isLogin ? "Create new User" : "Log in Instead"}
                </FlatButton>
            </View>

        </View>
    )
};

export default AuthContent;

const styles = StyleSheet.create({
    container: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: globalStyles.colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
})