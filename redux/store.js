import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// reducers 
import expenseReducer from "./reducers/expenses";
import uiReducer from "./reducers/ui";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    expenses: expenseReducer,
    ui: uiReducer,
});

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;