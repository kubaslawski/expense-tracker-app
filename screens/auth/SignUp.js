import { useState } from "react";
// components 
import AuthContent from "../../components/auth/AuthContent";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
// redux
import { useDispatch } from "react-redux";
// actions 
import { createUser } from "../../redux/actions/user";
import IsLoadingHOC from "../../hoc/isLoading";

const SignUpScreen = () => {

    const dispatch = useDispatch();

    const handleSignUp = ({ email, password }) => {
        dispatch(createUser({
            email: email,
            password: password,
        }))
    };

    return (
        <AuthContent
            isLogin={false}
            onAuthenticate={handleSignUp}
        />
    );
};

// export default SignUpScreen;
export default IsLoadingHOC(SignUpScreen);