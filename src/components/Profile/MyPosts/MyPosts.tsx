import React, { ChangeEvent } from 'react';
import s from './MyPosts.module.css';
import { Post } from "./Post/Post";
import { PostType } from "../../../redux/store";

export type PropsType = {
	posts: Array<PostType>
	newPostText: string
	onPostChange: (text: string) => void
	addPost: () => void
}

export const MyPosts: React.FC<PropsType> = ( props ) => {

	let postsElements = props.posts.map ( p => <Post message={p.message} likeCounts={p.likeCounts}/> )
	// добавление новой записи на стену
	let addPostHandler = () => {
		props.addPost()
	}

	// передача значения textarea в BLL
	let postChangeHandler = ( e: ChangeEvent<HTMLTextAreaElement> ) => {
		const text = e.currentTarget.value
		props.onPostChange(text)
	}

	return (
		<div className={s.myPosts}>
			<h3>My posts</h3>
			<div>
				<div>
                    <textarea
							  value={props.newPostText}
							  onChange={postChangeHandler}
						  />
				</div>
				<div className={s.button}>
					<button onClick={addPostHandler}>Add Post</button>
				</div>
			</div>
			{postsElements}
		</div>
	);
}