import React from "react";
import { Users } from "./Users";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Dispatch } from "redux";
import { followAC, InitialStateUserType, setUsersAC, unFollowAC, UserType } from "../../redux/usersReducer";

type MapStatePropsType = {
	userPage : InitialStateUserType
}

type MapDispatchPropsType = {
	follow : ( userId : string ) => void
	unFollow : ( userId : string ) => void
	setUsers : ( users : Array<UserType> ) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		userPage : state.usersPage
	}
}
const mapDispatchToProps = ( dispatch : Dispatch ) : MapDispatchPropsType => {
	return {
		follow : ( userId : string ) => {
			dispatch ( followAC ( userId ) )
		},
		unFollow : ( userId : string ) => {
			dispatch ( unFollowAC ( userId ) )
		},
		setUsers : ( users : Array<UserType> ) => {
			dispatch ( setUsersAC ( users ) )
		}
	}
}

export const UsersContainer = connect ( mapStateToProps, mapDispatchToProps ) ( Users );