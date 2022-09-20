import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// components 
import IconButton from './components/ui/IconButton';
// expenses screens 
import AllExpenses from './screens/expenses/AllExpenses';
import ManageExpense from './screens/expenses/ManageExpense';
import RecentExpenses from './screens/expenses/RecentExpenses';
// auth screens 
import LoginScreen from "./screens/auth/Login";
import SignUpScreen from "./screens/auth/SignUp";
// styles
import { globalStyles } from './constants/styles';
// context
// redux 
import store from './redux/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
// actions
import { AUTH_USER, SET_ERRORS, UNAUTH_USER } from './redux/types';
import { logoutUser } from './redux/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const BASE_URL = "http://localhost:5000/expense-tracker-app-6e4c5/europe-west3/api";
axios.defaults.baseURL = BASE_URL;

const ExpensesOverview = () => {
    return (
        <BottomTabs.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: globalStyles.colors.primary500
                },
                headerTintColor: "white",
                tabBarStyle: {
                    backgroundColor: globalStyles.colors.primary500,
                },
                tabBarActiveTintColor: globalStyles.colors.accent500,
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon="add"
                        size={24}
                        color={tintColor}
                        onPress={() => {
                            navigation.navigate("ManageExpense")
                        }}
                    />
                ),
            })}
        >
            <BottomTabs.Screen
                name="RecentExpensesScreen"
                component={RecentExpenses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={color} size={size} />
                }}
            />
            <BottomTabs.Screen
                name="AllExpenses"
                component={AllExpenses}
                options={{
                    title: "All Expenses",
                    tabBarLabel: "All",
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />
                }}
            />
        </BottomTabs.Navigator>
    )
}

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: globalStyles.colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: globalStyles.colors.primary100 },
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
    )
}

const Navigation = () => {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    return (
        <NavigationContainer>
            {isAuthenticated && <ExpensesOverview />}
            {!isAuthenticated && <AuthStack />}
        </NavigationContainer>
    )
};

const Root = () => {
    const [isTryingLogin, setIsTryingLogin] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    store.dispatch(logoutUser())
                } else {
                    store.dispatch({ type: UNAUTH_USER });
                    axios.defaults.headers.common['Authorization'] = token;
                    store.dispatch({ type: AUTH_USER })
                }
            };
            setIsTryingLogin(false);
        }
        fetchToken();
    }, [])

    if (isTryingLogin) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={"large"} color={"white"} />
            </View>
        );
    };
    return <Navigation />;

}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <Provider store={store}>
                <Root />
            </Provider>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: globalStyles.colors.primary700,
        minHeight: "100%",
        justifyContent: "center",
        padding: 24,
    }
});