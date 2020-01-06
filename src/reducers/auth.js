import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,

    VERIFY_REQUEST,
    VERIFY_SUCCESS
} from "../actions/";

export default (
    state = {
        isSigningUp: false,
        isSignedUp: false,
        isLoggingIn: false,

        isLoggingOut: false,
        isVerifying: false,
        signUpError: false,

        loginError: false,
        logoutError: false,

        isAuthenticated: false,
        user: {},
        error: {}
    },
    action
) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isSigningUp: true,
                signUpError: false,
                error: {}
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isSigningUp: false,
                isSignedUp: true,
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isSigningUp: false,
                isSignedUp: false,
                signUpError: true,
                error: action.payload
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false,
                error: {}
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.user
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true,
                error: action.payload
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                user: {}
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true,
                error: action.payload
            }
        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false
            };
        default:
            return state
    }
}