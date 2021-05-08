import React from 'react';
import { addPostAC, PostType } from "../../../redux/profileReducer";
import { MyPosts } from './MyPosts';
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { Dispatch } from "redux";

type MapStatePropsType = {
	posts : Array<PostType>
	// newPostText : string
}
type MapDispatchPropsType = {
	addPost : (newPostBody: string) => void
	// onPostChange : ( text : string ) => void
}

export type MyPostPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		posts:state.profilePage.posts
		// newPostText:state.profilePage.newPostText
	}
}

let mapDispatchToProps = ( dispatch : Dispatch ) : MapDispatchPropsType => {
	return {
		addPost:(newPostBody: string) => {
			dispatch ( addPostAC (newPostBody) )
		},
		// onPostChange:( text : string ) => {
		// 	dispatch ( updateNewPostTextAC ( text ) )
		// }
	}
}

export const MyPostsContainer = connect ( mapStateToProps, mapDispatchToProps ) ( MyPosts )