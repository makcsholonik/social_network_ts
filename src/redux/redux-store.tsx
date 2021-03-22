import { createStore, combineReducers  } from "redux";
import { dialogReducer } from "./dialogReducer";
import { profileReducer } from "./profileReducer";


let reducers = combineReducers({
	profileReducer: profileReducer,
	dialogReducer: dialogReducer
})

export type RootReduxState = ReturnType<typeof reducers>;
export let store = createStore(reducers);
//export type ReduxStoreType = typeof store



