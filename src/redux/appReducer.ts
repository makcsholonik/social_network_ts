import { getAuthUserData } from "./authReducer";


let initialState = {
	initialized : false as boolean
}

export type InitialStateAppType = typeof initialState

export type AppReducerActionsTypes = ReturnType<typeof initializedSuccess>

export const appReducer = ( state : InitialStateAppType = initialState, action : AppReducerActionsTypes ) : InitialStateAppType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS :
			return {
				...state,
				initialized : true
			}
		default:
			return state;
	}
}

export const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export const initializedSuccess = () => ({
	type : INITIALIZED_SUCCESS,
} as const);


export const initializeApp = () => {
	return ( dispatch : any ) => {
		let promise = dispatch ( getAuthUserData () );
		Promise.all ( [promise] ).then ( () => {
			dispatch ( initializedSuccess () );
		} )
	}
}





