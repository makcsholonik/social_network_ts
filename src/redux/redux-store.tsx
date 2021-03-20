import { createStore, combineReducers  } from "redux";
import { dialogReducer } from "./dialogReducer";
import { profileReducer } from "./profileReducer";


let reducers = combineReducers({
	profileReducer: profileReducer,
	dialogReducer: dialogReducer
})

export let store = createStore();



