import { createStore, combineReducers } from "redux";
import { dialogReducer } from "./dialogReducer";
import { profileReducer } from "./profileReducer";


let rootReducer = combineReducers ( {
	profileReducer:profileReducer,
	dialogReducer:dialogReducer
} )

export type AppStateType = ReturnType<typeof rootReducer>;
export let store = createStore ( rootReducer );

