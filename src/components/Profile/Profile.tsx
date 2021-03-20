import React from 'react';
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPosts } from "./MyPosts/MyPosts";
import { ActionsTypes, PostType } from "../../redux/store";

export type PropsType = {
	posts: Array<PostType>
	newPostText: string
	dispatch: ( action: ActionsTypes ) => void
}

export const Profile: React.FC<PropsType> = ( props ) => {
	return (
		<div>
			<ProfileInfo/>
			<MyPosts
				posts={props.posts}
				newPostText={props.newPostText}
				dispatch={props.dispatch.bind ( props.dispatch )}
			/>
		</div>
	);
}