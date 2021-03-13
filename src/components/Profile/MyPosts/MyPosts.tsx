import React, { ChangeEvent } from 'react';
import s from './MyPosts.module.css';
import { Post } from "./Post/Post";
import { ActionsTypes, addPostActionCreator, PostType, updateNewPostTextActionCreator } from "../../../redux/state";

export type PropsType = {
	posts: Array<PostType>
	newPostText: string
	dispatch: ( action: ActionsTypes ) => void
}

export const MyPosts: React.FC<PropsType> = ( props ) => {

	let postsElements = props.posts.map ( p => <Post message={p.message} likeCounts={p.likeCounts}/> )
	// добавление новой записи на стену
	let addPost = () => {
		props.dispatch ( addPostActionCreator(props.newPostText) )
	}
	// передача значения textarea в BLL
	let onPostChange = ( e: ChangeEvent<HTMLTextAreaElement> ) => {
		props.dispatch ( updateNewPostTextActionCreator(e) )
	}

	return (
		<div className={s.myPosts}>
			<h3>My posts</h3>
			<div>
				<div>
                    <textarea
							  value={props.newPostText}
							  onChange={onPostChange}
						  />
				</div>
				<div className={s.button}>
					<button onClick={addPost}>Add Post</button>
				</div>
			</div>
			{postsElements}
		</div>
	);
}