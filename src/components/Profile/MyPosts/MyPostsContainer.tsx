import React from 'react';
import { addPostAC, PostType } from "../../../redux/profileReducer";
import { MyPosts } from './MyPosts';
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { Dispatch } from "redux";

type MapStatePropsType = {
	posts : Array<PostType>
}
type MapDispatchPropsType = {
	addPost : (newPostBody: string) => void
}

export type MyPostPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		posts:state.profilePage.posts
	}
}

let mapDispatchToProps = ( dispatch : Dispatch ) : MapDispatchPropsType => {
	return {
		addPost:(newPostBody: string) => {
			dispatch ( addPostAC (newPostBody) )
		}
	}
}

export const MyPostsContainer = connect ( mapStateToProps, mapDispatchToProps ) ( MyPosts )