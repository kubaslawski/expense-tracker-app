// components 
import AuthContent from "../../components/auth/AuthContent";
// redux
import { useDispatch } from "react-redux";
// actions 
import { createUser } from "../../redux/actions/user";
import IsLoadingHOC from "../../hoc/isLoading";

const SignUpScreen = () => {

    const dispatch = useDispatch();

    const handleSignUp = ({ email, confirmEmail, password, confirmPassword }) => {
        dispatch(createUser({
            email: email,
            confirmEmail: confirmEmail,
            password: password,
            confirmPassword: confirmPassword
        }))
    };

    return (
        <AuthContent
            isLogin={false}
            onAuthenticate={handleSignUp}
        />
    );
};

export default IsLoadingHOC(SignUpScreen);