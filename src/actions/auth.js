import { myFirebase } from '../firebase/firebase'
import validateRegisterInput from '../validation/register'
import validateLoginInput from "../validation/login";

//actions types
export const REGISTER_REQUEST = "REGISTER_REQUEST"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILURE = "REGISTER_FAILURE"

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const LOGOUT_REQUEST = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"

export const VERIFY_REQUEST = "VERIFY_REQUEST"
export const VERIFY_SUCCESS = "VERIFY_SUCCESS"

//action creators
const requestRegister = () => {
    return {
        type: REGISTER_REQUEST
    }
}

const receiveRegister = () => {
    return {
        type: REGISTER_SUCCESS
    }
}
const registerError = (error) => {
    return {
        type: REGISTER_FAILURE,
        payload: error
    }
}

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}
const loginError = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = (error) => {
    return {
        type: LOGOUT_FAILURE,
        payload: error
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin())
    const {errors, isValid} = validateLoginInput({email, password})
    //valid errors
    if (!isValid) {
        dispatch(loginError(errors))
    } else {
        myFirebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch(receiveLogin(user))
            })
            .catch(error => {
                //server errors
                let message = error.message
                //translate error message
                if (error.code === 'auth/wrong-password') {
                    message = 'Неправильный пароль'
                }
                if (error.code === 'auth/user-not-found') {
                    message = 'Пользователь не найден'
                }
                dispatch(loginError({text: message}))
                console.log(error.code)
            })
    }
}

export const registerUser = (email, password, passwordConfirm) => dispatch =>{
    dispatch(requestRegister())
        const {errors, isValid} = validateRegisterInput({email, password, passwordConfirm})
        //valid errors
        if (!isValid) {
            dispatch(registerError(errors))
        } else {
            myFirebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    dispatch(receiveRegister())
                })
                .catch(e => {
                    //server errors
                    let message = e.message
                    //translate error message
                    if(e.code === 'auth/email-already-in-use') {
                        message = 'Данный адрес эл.почты уже используется'
                    }
                    dispatch(registerError({text: message}))
                })
        }


}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout())
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout())
        })
        .catch((error) => {
            dispatch(logoutError({text: error.message}))
        })
}

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest())
    myFirebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
            dispatch(receiveLogin(user))
        }
        dispatch(verifySuccess())
    })
}