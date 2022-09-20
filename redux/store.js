import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// reducers 
import expenseReducer from "./reducers/expenses";
import userReducer from "./reducers/user";
import uiReducer from "./reducers/ui";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    expenses: expenseReducer,
    ui: uiReducer,
    user: userReducer,
});

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;