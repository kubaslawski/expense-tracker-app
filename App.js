import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// components 
import IconButton from './components/ui/IconButton';
// expenses screens 
import AllExpenses from './screens/expenses/AllExpenses';
import ManageExpense from './screens/expenses/ManageExpense';
import RecentExpenses from './screens/expenses/RecentExpenses';
// auth screens 
import WelcomeScreen from "./screens/auth/Welcome";
import LoginScreen from "./screens/auth/Login";
import SignUpScreen from "./screens/auth/SignUp";
// styles
import { globalStyles } from './constants/styles';
// context
import ExpensesContextProvider from "./store/expenses-context";
// redux 
import store from './redux/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
// actions
import { AUTH_USER, SET_ERRORS, START_LOADING_UI, STOP_LOADING_UI, UNAUTH_USER } from './redux/types';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IsLoadingHOC from './hoc/isLoading';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export const BASE_URL = "https://expense-tracker-app-6e4c5-default-rtdb.europe-west1.firebasedatabase.app";

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
                name="RecentExpenses"
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

const AuthenticatedStack = () => {

    const dispatch = useDispatch();


    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: globalStyles.colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: globalStyles.colors.primary100 },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerRight: ({ tintColor }) => <IconButton
                        icon="exit"
                        color={tintColor}
                        size={24}
                        onPress={() => dispatch({ type: UNAUTH_USER })}
                    />
                }}
            />
        </Stack.Navigator>
    )
}

const Navigation = ({ isAuthenticated = false }) => {

    return (
        <NavigationContainer>
            {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
        </NavigationContainer>
    )
};

const RootComponent = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then((token) => {
                if (token) {
                    dispatch({
                        type: AUTH_USER,
                        payload: token
                    })
                }
            })
            .catch(() => dispatch({
                type: SET_ERRORS,
                payload: "An unknown error occured, please try again."
            }))
    }, []);

    return (
        <Navigation isAuthenticated={isAuthenticated} />
    )
}

export default function App() {





    return (
        <Provider store={store}>
            <StatusBar style='light' />
            <RootComponent />
        </Provider>
    )
    // return (
    //     <Provider store={store}>
    //         <NavigationContainer>
    //             <Stack.Navigator
    //                 screenOptions={{
    //                     headerStyle: { backgroundColor: globalStyles.colors.primary500 },
    //                     headerTintColor: 'white',
    //                 }}
    //             >
    //                 <Stack.Screen
    //                     name="ExpensesOverview"
    //                     component={ExpensesOverview}
    //                     options={{ headerShown: false }}
    //                 />
    //                 <Stack.Screen
    //                     name="ManageExpense"
    //                     component={ManageExpense}
    //                     options={{
    //                         presentation: 'modal',
    //                     }}
    //                 />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     </Provider>
    // );

};
