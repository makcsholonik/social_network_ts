import { authAPI } from "../api/api";
import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";

export const SET_USER_DATA = "samurai-network/auth/SET-USER-DATA";

export type DataType = {
	id : number
	email : string
	login : string
}

export type AuthType = {
	data : DataType
	resultCode : number
	messages : Array<string>
}

const initialState = {
	id : null as number | null,
	email : null as string | null,
	login : null as string | null,
	isAuth : false
};

export type InitialStateAuthType = typeof initialState

export type AuthReducerActionsTypes = ReturnType<typeof setAuthUserData>

export const authReducer = ( state : InitialStateAuthType = initialState, action : AuthReducerActionsTypes ) : InitialStateAuthType => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};

export const setAuthUserData = ( id : number, email : string, login : string, isAuth : boolean ) => ({
	type : SET_USER_DATA,
	payload : { id, email, login, isAuth }
} as const);

export const getAuthUserData = () => async ( dispatch : Dispatch ) => {
	let response = await authAPI.me ();

	if (response.data.resultCode === 0) {
		let { id, email, login } = response.data.data;
		dispatch ( setAuthUserData ( id, email, login, true ) );
	}
};

export const login = ( email : string, password : string, rememberMe : boolean ) => async ( dispatch : any ) => {
	let response = await authAPI.login ( email, password, rememberMe );
	if (response.data.resultCode === 0) {
		dispatch ( getAuthUserData () );
	} else {
		let message = response.data.messages.length > 0 ? response.data.messages[ 0 ] : "Some error";
		dispatch ( stopSubmit ( "login", { _error : message } ) );
	}
};

export const logout = () => async ( dispatch : any ) => {
	let response = await authAPI.logout ();
	if (response.data.resultCode === 0) {
		// @ts-ignore
		dispatch ( setAuthUserData ( null, null, null, false ) );
	}
};





