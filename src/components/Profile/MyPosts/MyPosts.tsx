import React from 'react';
import s from './MyPosts.module.css';
import { MyPostPropsType } from './MyPostsContainer';
import { Post } from "./Post/Post";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/Textarea/FormControl";

export const MyPosts = ( props : MyPostPropsType ) => {

	let postsElements = props.posts.map ( p => <Post message={ p.message } likeCounts={ p.likeCounts }/> )

	let addNewPost = ( formData : FormDataType ) => {
		props.addPost ( formData.newPostBody )
	}

	return (
		<div className={ s.myPosts }>
			<h3>My posts</h3>
			<AddPostFormRedux onSubmit={ addNewPost }/>
			{ postsElements }
		</div>
	);
}

type FormDataType = {
	newPostBody : string
}

const maxLength50 = maxLengthCreator ( 50 );

export const AddPostForm = ( props : InjectedFormProps<FormDataType> ) => {
	return (
		<form onSubmit={ props.handleSubmit }>
			<Field component={ Textarea } placeholder={ "Enter your post" } name={ "newPostBody" }
					 validate={ [required, maxLength50] }/>
			<button className={ s.button }>Add Post</button>
		</form>
	)
}

const AddPostFormRedux = reduxForm<FormDataType> ( { form : "addPostForm" } ) ( AddPostForm )
