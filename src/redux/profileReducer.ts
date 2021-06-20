import { v1 } from "uuid";
import { profileAPI } from "../api/api";
import { Dispatch } from "redux";

export const ADD_POST = "samurai-network/profile/-POST";
export const SET_USER_PROFILE = "samurai-network/profile/SET-USER-PROFILE";
export const SET_STATUS = "samurai-network/profile/SET-STATUS";

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
	profile : null as ProfileType | null,
	status : ""
};

type InitialStateProfileType = typeof initialState;

export type ProfileReducerActionsTypes =
	ReturnType<typeof addPostAC>
	| ReturnType<typeof setUserProfile>
	| ReturnType<typeof setStatus>

export const profileReducer = ( state : InitialStateProfileType = initialState, action : ProfileReducerActionsTypes ) : InitialStateProfileType => {
	switch (action.type) {
		case ADD_POST:
			let newPost : PostType = {
				id : v1 (),
				message : action.newPostBody,
				likeCounts : 0
			};
			return { ...state, posts : [...state.posts, newPost] };
		case SET_USER_PROFILE:
			return { ...state, profile : action.profile };
		case SET_STATUS:
			return { ...state, status : action.status };
		default:
			return state;
	}
};

export const addPostAC = ( newPostBody : string ) => ({ type : ADD_POST, newPostBody } as const);
export const setUserProfile = ( profile : ProfileType ) => ({ type : SET_USER_PROFILE, profile } as const);
export const setStatus = ( status : string ) => ({ type : SET_STATUS, status } as const);

// * если ajax запросы - создаём thunk
export const getUserProfile = ( userId : string ) => async ( dispatch : Dispatch ) => {
	const response = await profileAPI.getProfile ( userId );
	dispatch ( setUserProfile ( response.data ) );
};
export const getStatusProfile = ( userId : string ) => async ( dispatch : Dispatch ) => {
	const response = await profileAPI.getStatus ( userId );
	dispatch ( setStatus ( response.data ) );
};

export const updateStatusProfile = ( status : string ) => async ( dispatch : Dispatch ) => {
	const response = await profileAPI.updateStatus ( status );
	if (response.data.resultCode === 0) {
		dispatch ( setStatus ( status ) );
	}
};