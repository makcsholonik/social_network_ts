import React from 'react';
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../redux/profileReducer";

type PropsProfileType = {
	profile : ProfileType | null
}

export const Profile = ( props : PropsProfileType ) => {
	return (
		<div>
			<ProfileInfo profile={ props.profile }/>
			<MyPostsContainer/>
		</div>
	);
}