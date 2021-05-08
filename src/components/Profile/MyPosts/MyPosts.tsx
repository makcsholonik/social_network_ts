import React, { ChangeEvent } from 'react';
import s from './MyPosts.module.css';
import { MyPostPropsType } from './MyPostsContainer';
import { Post } from "./Post/Post";

export const MyPosts = ( props : MyPostPropsType ) => {

	let postsElements = props.posts.map ( p => <Post message={ p.message } likeCounts={ p.likeCounts }/> )
	let addPostHandler = () => {
		props.addPost ()
	}

	let postChangeHandler = ( e : ChangeEvent<HTMLTextAreaElement> ) => {
		const text = e.currentTarget.value
		props.onPostChange ( text )
	}

	return (
		<div className={ s.myPosts }>
			<h3>My posts</h3>
			<div>
				<div>
                    <textarea
							  value={ props.newPostText }
							  onChange={ postChangeHandler }
						  />
				</div>
				<div className={ s.button }>
					<button onClick={ addPostHandler }>Add Post</button>
				</div>
			</div>
			{ postsElements }
		</div>
	);
}