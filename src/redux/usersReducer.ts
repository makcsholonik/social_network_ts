

/*type LocationType = {
	id : string
	city : string
	country : string
}

export type UsersType = {
	id : string
	photoUrl : string
	followed : boolean,
	fullName : string
	status : string
	location : LocationType
}*/

let initialState = {
	users : []
}

type InitialStateUsersType = typeof initialState;

export type UsersReducerActionType =
	ReturnType<typeof followAC>
	| ReturnType<typeof unFollowAC>
	| ReturnType<typeof setUsersAC>

export const usersReducer = ( state : InitialStateUsersType = initialState, action : UsersReducerActionType ) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users : state.users.map ( u => {
					if (u.id === action.userId)
						return { ...u, followed : true }
				} )
			}
		case UNFOLLOW:
			return {
				...state,
				users : state.users.map ( u => {
					if (u.id === action.userId)
						return { ...u, followed : false }
				} )
			}
		case SET_USERS:
			return { ...state, users : [...state.users, ...action.users] } // делаем копию старых users которые были в массиве и добавляем к ним users которые пришли из action
	}
}

export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';

export const followAC = ( userId : string ) => ({ type : FOLLOW, userId });
export const unFollowAC = ( userId : string ) => ({ type : FOLLOW, userId });
export const setUsersAC = ( users : string ) => ({ type : SET_USERS, users });
