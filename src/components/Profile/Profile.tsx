import React from 'react';
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../redux/profileReducer";

type PropsProfileType = {
	profile : ProfileType | null
	status: string
	updateStatusProfile : ( status : string ) => void
}

export const Profile = ( props : PropsProfileType ) => {
	return (
		<div>
			<ProfileInfo profile={ props.profile } status={ props.status} updateStatusProfile={ props.updateStatusProfile}/>
			<MyPostsContainer/>
		</div>
	);
}