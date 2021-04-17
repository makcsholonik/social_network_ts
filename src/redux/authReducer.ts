// object
// id: number
// email: string
// login: string
//
// data: object
// resultCode: number
// messages: string
// где описывать GET

export type DataType = {
	id : number
	email : string
	login : string
	isAuth: boolean
}

// support - полоса прокрутки
// support - id,email,login или data
let initialState = {
	// id : null,
	// email : null,
	// login : null
	data : null as Array<DataType> | null,
	isAuth: false
}

export type InitialStateAuthType = typeof initialState;

export type AuthReducerActionsTypes = ReturnType<typeof setAuthUserData>

export const authReducer = ( state : InitialStateAuthType = initialState, action : AuthReducerActionsTypes ) : InitialStateAuthType => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...state.data,
				isAuth : true
			}
		default:
			return state;
	}
}

export const SET_USER_DATA = "SET-USER-DATA";

export const setAuthUserData = ( id : number, email : string, login : string ) => ({
	type : SET_USER_DATA,
	data : { id, email, login }
} as const);
