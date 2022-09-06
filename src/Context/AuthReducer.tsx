import { SET_LOADING, ERROR, SET_USER_DATA, LOGOUT } from "./Types";

export const AuthReducer = (state: any, { type, payload }: any) => {

    switch (type) {

        case SET_LOADING:
            return { ...state,
                loading: true
            };
        
        case ERROR:
            return { ...state,
                loading: false,
            };

        case SET_USER_DATA:
            return { ...state,
                userData: payload,
                isAuthenticated: true,
                loading: false
            };
        case LOGOUT:
            return { ...state,
                userData: {},
                isAuthenticated: false,
                loading: false
            };

        default:
            return state;
    }
};
