import React from "react";
import { Users } from "./Users";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Dispatch } from "redux";
import { followAC, setUsersAC, unFollowAC } from "../../redux/usersReducer";

type MapStatePropsType  = {
	users: []
}

type MapDispatchPropsType = {
	follow : ( userId : string ) => void
	unFollow : ( userId : string ) => void
	setUsers : ( users : any ) => void // fixed
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ): MapStatePropsType => {
	return {
		users: state.usersPage.users // fixed
	}
}
const mapDispatchToProps = ( dispatch : Dispatch ): MapDispatchPropsType => {
	return {
		follow: (userId: string) => {
			dispatch(followAC(userId))
		},
		unFollow: (userId: string) => {
			dispatch(unFollowAC(userId))
		},

		// fixed

		setUsers: (users: any ) => {
			dispatch(setUsersAC(users))
		}

	}}

export const UsersContainer = connect (mapStateToProps, mapDispatchToProps)(Users);