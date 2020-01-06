import {applyMiddleware, compose, createStore} from 'redux'
import thunkMiddleWare from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import {verifyAuth} from './actions'
import rootReducer from './reducers'

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
});

export default function configureStore(persistedState) {
//     const store = createStore(
// //         rootReducer,
// //         persistedState,
// //         compose(applyMiddleware(thunkMiddleWare),
// //             window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()))
// //     store.dispatch(verifyAuth())
// //     return store
// // }

    const store = createStore(
        rootReducer,
        persistedState,
        composeEnhancers(applyMiddleware(thunkMiddleWare)))
    store.dispatch(verifyAuth())
    return store
}