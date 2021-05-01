import { v1 } from "uuid";
import { profileAPI, usersAPI } from "../api/api";

export type PostType = {
	id : string
	message : string
	likeCounts : number
}

type ObjectType = {
	github : string
	vk : string
	facebook : string
	instagram : string
	twitter : string
	website : string
	youtube : string
	mainLink : string
}

type PhotosType = {
	small : string
	large : string
}

export type ProfileType = {
	userId : number
	lookingForAJob : boolean
	lookingForAJobDescription : string
	fullName : string
	contacts : ObjectType
	photos : PhotosType
}


let initialState = {
	posts : [
		{ id : v1 (), message : "Hello, I'm fine.", likeCounts : 30 },
		{ id : v1 (), message : "Hello!", likeCounts : 31 }
	] as Array<PostType>,
	newPostText : "",
	profile : null as ProfileType | null,
	status : ""
};

type InitialStateProfileType = typeof initialState;

export type ProfileReducerActionsTypes =
	ReturnType<typeof addPostAC>
	| ReturnType<typeof updateNewPostTextAC>
	| ReturnType<typeof setUserProfile>
	| ReturnType<typeof setStatus>

export const profileReducer = ( state : InitialStateProfileType = initialState, action : ProfileReducerActionsTypes ) : InitialStateProfileType => {
	switch (action.type) {
		case ADD_POST:
			let newPost : PostType = {
				id : v1 (),
				message : state.newPostText,
				likeCounts : 0
			}
			return { ...state, posts : [...state.posts, newPost], newPostText : "" };
		case UPDATE_NEW_POST_TEXT:
			return { ...state, newPostText : action.postText };
		case SET_USER_PROFILE:
			return { ...state, profile : action.profile };
		case SET_STATUS:
			return { ...state, status : action.status }
		default:
			return state;
	}
}

export const ADD_POST = "ADD-POST";
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
export const SET_USER_PROFILE = "SET-USER-PROFILE";
export const SET_STATUS = "SET-STATUS";

export const addPostAC = () => ({ type : ADD_POST, } as const);
export const updateNewPostTextAC = ( text : string ) => ({ type : UPDATE_NEW_POST_TEXT, postText : text } as const);
export const setUserProfile = ( profile : ProfileType ) => ({ type : SET_USER_PROFILE, profile } as const);
export const setStatus = ( status : string ) => ({ type : SET_STATUS, status } as const)

// * если ajax запросы - создаём thunk
export const getUserProfile = ( userId : string ) => {
	return ( dispatch : any ) => {
		profileAPI.getProfile ( userId ).then ( response => {
			dispatch ( setUserProfile ( response.data ) );
		} );
	}
}
export const getStatusProfile = ( userId : string ) => {
	return ( dispatch : any ) => {
		profileAPI.getStatus ( userId ).then ( response => {
			dispatch ( setStatus ( response.data ) );
		} );
	}
}
export const updateStatusProfile = ( status : string ) => {
	return ( dispatch : any ) => {
		profileAPI.updateStatus ( status ).then ( response => {
			if (response.data.resultCode === 1) {
				dispatch ( setStatus ( status ) );
			}
		} );
	}
}