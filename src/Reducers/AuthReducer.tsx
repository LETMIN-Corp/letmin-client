import ReducerEnum from "../Utils/ReducerEnum";

export const AuthReducer = (state: any, { type, payload }: any) => {

    switch (type) {

        case ReducerEnum.set_loading:
            return { ...state,
                loading: true
            };
        
        case ReducerEnum.error:
            return { ...state,
                loading: false,
            };

        case ReducerEnum.set_user_data:
            return { ...state,
                userData: payload,
                isAuthenticated: true,
                loading: false
            };
        case ReducerEnum.logout:
            return { ...state,
                userData: {},
                isAuthenticated: false,
                loading: false
            };

        default:
            return state;
    }
};
