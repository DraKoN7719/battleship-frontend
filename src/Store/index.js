import {createStore, combineReducers, applyMiddleware} from "redux"
import {userReducer} from "./userReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {STOMPReducer} from "./STOMPReducer";

const rootReducer = combineReducers({
    "user": userReducer,
    "connect": STOMPReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))