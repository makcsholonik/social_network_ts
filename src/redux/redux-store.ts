import { createStore, combineReducers, applyMiddleware } from "redux";
import { dialogReducer } from "./dialogReducer";
import { profileReducer } from "./profileReducer";
import { usersReducer } from "./usersReducer";
import { authReducer } from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import { appReducer } from "./appReducer";

let rootReducer = combineReducers ( {
	profilePage : profileReducer,
	dialogPage : dialogReducer,
	usersPage : usersReducer,
	auth: authReducer,
	app: appReducer,
	form: formReducer // * redux-form
} )

export type AppStateType = ReturnType<typeof rootReducer>;
export let store = createStore ( rootReducer, applyMiddleware(thunkMiddleware) );

