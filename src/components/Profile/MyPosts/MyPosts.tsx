import React, { ChangeEvent } from 'react';
import s from './MyPosts.module.css';
import { MyPostPropsType } from './MyPostsContainer';
import { Post } from "./Post/Post";
import { Field, reduxForm } from "redux-form";

export const MyPosts = ( props : MyPostPropsType ) => {

	let postsElements = props.posts.map ( p => <Post message={ p.message } likeCounts={ p.likeCounts }/> )
	// let addPostHandler = () => {
	// 	props.addPost ()
	// }
	//
	// let postChangeHandler = ( e : ChangeEvent<HTMLTextAreaElement> ) => {
	// 	const text = e.currentTarget.value
	// 	props.onPostChange ( text )
	// }

	let addNewPost = (values: any) => {
		props.addPost(values.newPostBody)
	}

	return (
		<div className={ s.myPosts }>
			<h3>My posts</h3>
			<AddPostFormRedux onSubmit={ addNewPost }/>
			{/*<div>
				<div>
                    <textarea
							  value={ props.newPostText }
							  onChange={ postChangeHandler }
						  />
				</div>
				<div className={ s.button }>
					<button onClick={ addPostHandler }>Add Post</button>
				</div>
			</div>*/}
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

export const AddPostFormRedux = reduxForm<any> ({form: "addPostForm"})(AddPostForm)
