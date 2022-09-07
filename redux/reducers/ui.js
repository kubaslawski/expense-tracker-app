import { DATA_FETCHING_ERROR } from "../types";

const initialState = {
    errorMessage: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DATA_FETCHING_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
            };
        default: return state;
    }
}