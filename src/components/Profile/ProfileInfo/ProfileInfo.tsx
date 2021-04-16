import React from "react";
import s from "./ProfileInfo.module.css"
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfileType } from "../../../redux/profileReducer";

type PropsProfileInfoType = {
	profile : ProfileType | null
}


export const ProfileInfo = ( props : PropsProfileInfoType ) => {
	if ( !props.profile) {
		return <Preloader/>
	}
	return (
		<div>
			<div>
				<img
					src="https://image.freepik.com/free-vector/nature-background-with-mountain-and-field_104785-409.jpg"
					alt="profile avatar"/>
			</div>
			<div className={ s.description }>
				<img src={ props.profile.photos.large } alt=""/>
				avatar + description
			</div>
		</div>
	)
}