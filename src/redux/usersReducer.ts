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
	users : [] as Array<any>,
	pageSize : 5, // кол-во пользователей на 1 стр.
	totalUsersCount : 0, // всего пользователей
	currentPage : 1 // текущая страница пришедшая с сервера
}

export type InitialStateUserType = typeof initialState;

export type UsersReducerActionType =
	ReturnType<typeof followAC>
	| ReturnType<typeof unFollowAC>
	| ReturnType<typeof setUsersAC>
	| ReturnType<typeof setCurrentPageAC>
	| ReturnType<typeof setTotalUserCountsAC>

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
			return { ...state, users : action.users }
		case SET_CURRENT_PAGE:
			return { ...state, currentPage : action.currentPage }
		case SET_TOTAL_USER_COUNT:
			return {...state, totalUsersCount : action.totalCount}
		default:
			return state
		// делаем копию старых users которые были в массиве и добавляем к ним users которые пришли из action
	}
}

export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';
export const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
export const SET_TOTAL_USER_COUNT = 'SET-TOTAL-USER-COUNT';

export const followAC = ( userId : string ) => ({ type : FOLLOW, userId } as const);
export const unFollowAC = ( userId : string ) => ({ type : UNFOLLOW, userId } as const);
export const setUsersAC = ( users : Array<UserType> ) => ({ type : SET_USERS, users } as const);
export const setCurrentPageAC = ( currentPage : number ) => ({ type : SET_CURRENT_PAGE, currentPage } as const);
export const setTotalUserCountsAC = ( totalCount : number ) => ({ type : SET_TOTAL_USER_COUNT, totalCount } as const);
