type LocationType = {
	id : string
	city : string
	country : string
}

export type UserType = {
	id : string
	photoUrl : string
	followed : boolean,
	fullName : string
	status : string
	location : LocationType
}

const initialState = {
	users : [] as Array<any>
}

export type InitialStateUserType = typeof initialState;

export type UsersReducerActionType =
	ReturnType<typeof followAC>
	| ReturnType<typeof unFollowAC>
	| ReturnType<typeof setUsersAC>

export const usersReducer = ( state : InitialStateUserType = initialState, action : UsersReducerActionType ) : InitialStateUserType => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users : state.users.map ( u => {
					if (u.id === action.userId)
						return { ...u, followed : true }
					return u;
				} )
			}
		case UNFOLLOW:
			return {
				...state,
				users : state.users.map ( u => {
					if (u.id === action.userId)
						return { ...u, followed : false }
					return u;
				} )
			}
		case SET_USERS:
			return { ...state, users : [...state.users, ...action.users] }
		default:
			return state
		// делаем копию старых users которые были в массиве и добавляем к ним users которые пришли из action
	}
}

export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';

export const followAC = ( userId : string ) => ({ type : FOLLOW, userId } as const);
export const unFollowAC = ( userId : string ) => ({ type : UNFOLLOW, userId } as const);
export const setUsersAC = ( users : Array<UserType> ) => ({ type : SET_USERS, users } as const);
