import React from 'react';
import s from './MyPosts.module.css';
import { MyPostPropsType } from './MyPostsContainer';
import { Post } from "./Post/Post";
import { Field, reduxForm } from "redux-form";

export const MyPosts = ( props : MyPostPropsType ) => {

	let postsElements = props.posts.map ( p => <Post message={ p.message } likeCounts={ p.likeCounts }/> )

	let addNewPost = (values: any) => {
		props.addPost(values.newPostBody)
	}

	return (
		<div className={ s.myPosts }>
			<h3>My posts</h3>
			<AddPostFormRedux onSubmit={ addNewPost }/>
			{ postsElements }
		</div>
	);
}

export const AddPostForm = ( props : any ) => {
	return (
		<form onSubmit={ props.handleSubmit }>
			<Field component={ "textarea" } placeholder={ "Enter your post" } name={ "newPostBody" }/>
			<button className={ s.button }>Add Post</button>
		</form>
	)
}

const AddPostFormRedux = reduxForm<any> ({form: "addPostForm"})(AddPostForm)
