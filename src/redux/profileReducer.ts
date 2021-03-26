import { v1 } from "uuid";
import { ActionsTypes, PostType, ProfilePageType } from "./store";
import { ChangeEvent } from "react";

export const ADD_POST = "ADD-POST";
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export type ProfileReducerActionsTypes =
	ReturnType<typeof addPostAC>
	| ReturnType<typeof updateNewPostTextAC>

let initialState = {
	posts:[
		{ id:v1 (), message:"Hello, I'm fine.", likeCounts:30 },
		{ id:v1 (), message:"Hello!", likeCounts:31 }
	],
	newPostText:""
};

export const profileReducer = ( state : ProfilePageType = initialState, action : ActionsTypes ) : ProfilePageType => {
	switch (action.type) {
		case ADD_POST:
			let newPost : PostType = {
				id:v1 (),
				message:state.newPostText,
				likeCounts:0
			}
			state.posts.push ( newPost );
			state.newPostText = "";
			return state;
		case UPDATE_NEW_POST_TEXT:
			state.newPostText = action.postText;
			return state;
		default:
			return state;
	}
}

export const addPostAC = (  ) => {
	return {
		type:ADD_POST,
	} as const
}
export const updateNewPostTextAC = ( text : string ) => {
	return {
		type:UPDATE_NEW_POST_TEXT,
		postText:text
	} as const
}