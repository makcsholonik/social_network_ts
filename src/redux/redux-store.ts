import { createStore, combineReducers } from "redux";
import { dialogReducer } from "./dialogReducer";
import { profileReducer } from "./profileReducer";
import { usersReducer } from "./usersReducer";
import { authReducer } from "./authReducer";


let rootReducer = combineReducers ( {
	profilePage : profileReducer,
	dialogPage : dialogReducer,
	usersPage : usersReducer,
	auth: authReducer
} )

export type AppStateType = ReturnType<typeof rootReducer>;
export let store = createStore ( rootReducer );

