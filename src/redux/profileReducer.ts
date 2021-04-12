import { v1 } from "uuid";

export type PostType = {
	id : string
	message : string
	likeCounts : number
}

let initialState = {
	posts : [
		{ id : v1 (), message : "Hello, I'm fine.", likeCounts : 30 },
		{ id : v1 (), message : "Hello!", likeCounts : 31 }
	] as Array<PostType>,
	newPostText : "",
	profile: null
};

type InitialStateProfileType = typeof initialState;

export type ProfileReducerActionsTypes =
	ReturnType<typeof addPostAC>
	| ReturnType<typeof updateNewPostTextAC>
	| ReturnType<typeof setUserProfile>

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
		default:
			return state;
	}
}

export const ADD_POST = "ADD-POST";
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
export const SET_USER_PROFILE = "SET-USER-PROFILE";

export const addPostAC = () => ({ type : ADD_POST, } as const);
export const updateNewPostTextAC = ( text : string ) => ({ type : UPDATE_NEW_POST_TEXT, postText : text } as const);
export const setUserProfile = ( profile : null ) => ({ type : SET_USER_PROFILE, profile } as const);