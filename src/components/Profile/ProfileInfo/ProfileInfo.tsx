import React from "react";
import s from "./ProfileInfo.module.css"
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfileType } from "../../../redux/profileReducer";
import { ProfileStatus } from "./ProfileStatus";

type PropsProfileInfoType = {
	profile : ProfileType | null
}


export const ProfileInfo = ( props : PropsProfileInfoType ) => {
	if ( !props.profile) {
		return <Preloader/>
	}
	return (
		<div>
			<div className={ s.description }>
				<img src={ props.profile.photos.large } alt=""/>
				<ProfileStatus status={"Hello world!"}/>
			</div>
		</div>
	)
}