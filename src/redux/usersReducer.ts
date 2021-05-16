import { usersAPI } from "../api/api";

type PhotosType = {
	small : string
	large : string
}

// type LocationType = {
// 	id : string
// 	city : string
// 	country : string
// }

export type ItemsType = {
	id : string
	name : string
	status : string
	photos : PhotosType
	followed : boolean,
}

// export type UserType = {
// 	items : Array<ItemsType>
// 	totalCount : number
// 	error : string
// }

const initialState = {
	users : [] as Array<ItemsType>,
	pageSize : 5, // кол-во пользователей на 1 стр.
	totalUsersCount : 0, // всего пользователей
	currentPage : 1, // текущая страница пришедшая с сервера
	isFetching : false,
	followingInProgress : []
}

export type InitialStateUserType = typeof initialState;

export type UsersReducerActionType =
	ReturnType<typeof followSuccess>
	| ReturnType<typeof unfollowSuccess>
	| ReturnType<typeof setUsers>
	| ReturnType<typeof setCurrentPage>
	| ReturnType<typeof setTotalUserCounts>
	| ReturnType<typeof toggleIsFetching>
	| ReturnType<typeof toggleFollowingProgress>

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
			return { ...state, totalUsersCount : action.totalCount }
		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching : action.isFetching }
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				// support
				// @ts-ignore
				followingInProgress : action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter ( id => id !== action.userId )
			}
		default:
			return state
	}
}

export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';
export const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
export const SET_TOTAL_USER_COUNT = 'SET-TOTAL-USER-COUNT';
export const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

export const followSuccess = ( userId : string ) => ({ type : FOLLOW, userId } as const);
export const unfollowSuccess = ( userId : string ) => ({ type : UNFOLLOW, userId } as const);
export const setUsers = ( users : Array<ItemsType> ) => ({ type : SET_USERS, users } as const);
export const setCurrentPage = ( currentPage : number ) => ({ type : SET_CURRENT_PAGE, currentPage } as const);
export const setTotalUserCounts = ( totalCount : number ) => ({ type : SET_TOTAL_USER_COUNT, totalCount } as const);
export const toggleIsFetching = ( isFetching : boolean ) => ({ type : TOGGLE_IS_FETCHING, isFetching } as const);
export const toggleFollowingProgress = ( isFetching : boolean, userId : string ) => ({
	type : TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
} as const);

export const requestUser = ( currentPage : number, pageSize : number ) => {
	return ( dispatch : any ) => {
		dispatch ( toggleIsFetching ( true ) );
		usersAPI.getUsers ( currentPage, pageSize ).then ( data => {
			dispatch ( toggleIsFetching ( false ) );
			dispatch ( setUsers ( data.items ) );
			dispatch ( setTotalUserCounts ( data.totalCount ) );
		} );
	}
}

export const follow = ( id : string ) => {
	return ( dispatch : any ) => {
		dispatch ( toggleFollowingProgress ( true, id ) );
		usersAPI.follow ( id ).then ( response => {
			if (response.data.resultCode === 0) {
				dispatch ( followSuccess ( id ) )
			}
			dispatch ( toggleFollowingProgress ( false, id ) );
		} );
	}
}

export const unfollow = ( id : string ) => {
	return ( dispatch : any ) => {
		dispatch ( toggleFollowingProgress ( true, id ) );
		usersAPI.unfollow ( id ).then ( response => {
			if (response.data.resultCode === 0) {
				dispatch ( unfollowSuccess ( id ) )
			}
			dispatch ( toggleFollowingProgress ( false, id ) );
		} );
	}
}