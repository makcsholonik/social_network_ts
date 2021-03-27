import React from 'react';
import { addPostAC, PostType, updateNewPostTextAC } from "../../../redux/profileReducer";
import { MyPosts } from './MyPosts';
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { Dispatch } from "redux";

type MapStatePropsType = {
	posts : Array<PostType>
	newPostText : string
}
type MapDispatchPropsType = {
	addPost : () => void
	onPostChange : ( text : string ) => void
}

export type MyPostPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		posts:state.profileReducer.posts,
		newPostText:state.profileReducer.newPostText
	}
}

let mapDispatchToProps = ( dispatch : Dispatch ) : MapDispatchPropsType => {
	return {
		addPost:() => {
			dispatch ( addPostAC () )
		},
		onPostChange:( text : string ) => {
			dispatch ( updateNewPostTextAC ( text ) )
		}
	}
}

export const MyPostsContainer = connect ( mapStateToProps, mapDispatchToProps ) ( MyPosts )