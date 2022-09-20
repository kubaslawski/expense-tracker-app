// components 
import AuthContent from "../../components/auth/AuthContent";
// redux 
import { useDispatch } from "react-redux";
// actions
import { loginUser } from "../../redux/actions/user";
import IsLoadingHOC from "../../hoc/isLoading";

const LoginScreen = () => {

    const dispatch = useDispatch();

    const handleLogin = ({ email, password }) => {
        dispatch(loginUser({
            email: email,
            password: password,
        }));
    };

    return (
        <AuthContent
            isLogin={true}
            onAuthenticate={handleLogin}
        />
    );
};

export default IsLoadingHOC(LoginScreen);