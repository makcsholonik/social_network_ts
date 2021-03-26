import React from 'react';
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { ActionsTypes, PostType } from "../../redux/store";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";

export type PropsType = {
	posts: Array<PostType>
	newPostText: string
	dispatch: ( action: ActionsTypes ) => void
}

export const Profile = ( props: PropsType ) => {
	return (
		<div>
			<ProfileInfo/>
			<MyPostsContainer
				posts={props.posts}
				newPostText={props.newPostText}
				dispatch={props.dispatch.bind ( props.dispatch )}
			/>
		</div>
	);
}