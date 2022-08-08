import { SET_LOADING, SET_USER_DATA } from "./Types";

export const Reducer = (state: any, { type, payload }: any) => {

    switch (type) {

        case SET_LOADING:
            return { ...state,
                loading: true
            };

        case SET_USER_DATA:
            return { ...state,
                userData: payload,
                isAuthenticated: true,
                loading: false
            };

        default:
            return state;
    }
};