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

let initialState = {
	id : null as number | null,
	email : null as string | null,
	login : null as string | null,
	isAuth : false
}

export type InitialStateAuthType = typeof initialState

export type AuthReducerActionsTypes = ReturnType<typeof setAuthUserData>

export const authReducer = ( state : InitialStateAuthType = initialState, action : AuthReducerActionsTypes ) : InitialStateAuthType => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.data,
				isAuth : true
			}
		default:
			return state;
	}
}

export const SET_USER_DATA = "SET-USER-DATA";

export const setAuthUserData = ( id : number, email : string, login : string, ) => ({
	type : SET_USER_DATA,
	data : { id, email, login }
} as const);
