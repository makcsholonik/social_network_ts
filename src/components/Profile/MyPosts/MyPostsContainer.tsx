import React from 'react';
import { ActionsTypes, PostType } from "../../../redux/store";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profileReducer";
import { MyPosts } from './MyPosts';

export type PropsType = {
	posts : Array<PostType>
	newPostText : string
	dispatch : ( action : ActionsTypes ) => void
}

export const MyPostsContainer = ( props : PropsType ) => {

	// добавление новой записи на стену
	let addPost = () => {
		props.dispatch ( addPostAC () )
	}
	// передача значения textarea в BLL
	let onPostChange = ( text : string ) => {
		props.dispatch ( updateNewPostTextAC ( text ) )
	}

	return (
		<MyPosts onPostChange={ onPostChange } addPost={ addPost } posts={ props.posts }
					newPostText={ props.newPostText }/>
	);
}