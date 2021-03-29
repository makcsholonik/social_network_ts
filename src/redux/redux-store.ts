import { createStore, combineReducers } from "redux";
import { dialogReducer } from "./dialogReducer";
import { profileReducer } from "./profileReducer";
import { usersReducer } from "./usersReducer";


let rootReducer = combineReducers ( {
	profilePage : profileReducer,
	dialogPage : dialogReducer,
	usersPage : usersReducer
} )

export type AppStateType = ReturnType<typeof rootReducer>;
export let store = createStore ( rootReducer );

