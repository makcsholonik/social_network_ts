import React from "react";
import { Users } from "./Users";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Dispatch } from "redux";
import {
	followAC,
	InitialStateUserType,
	setCurrentPageAC, setTotalUserCountsAC,
	setUsersAC,
	unFollowAC,
	UserType
} from "../../redux/usersReducer";

type MapStatePropsType = {
	userPage : InitialStateUserType
	pageSize : number
	totalUsersCount : number
	currentPage : number
}

type MapDispatchPropsType = {
	follow : ( userId : string ) => void
	unFollow : ( userId : string ) => void
	setUsers : ( users : Array<UserType> ) => void
	setCurrentPage: (pageNumber: number ) => void
	setTotalUserCounts : ( totalCount: number ) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		userPage : state.usersPage,
		pageSize : state.usersPage.pageSize,
		totalUsersCount : state.usersPage.totalUsersCount,
		currentPage : state.usersPage.currentPage
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
		},
		setCurrentPage : ( pageNumber: number ) => {
			dispatch ( setCurrentPageAC ( pageNumber ) )
		},
		setTotalUserCounts : ( totalCount: number ) => {
			dispatch ( setTotalUserCountsAC ( totalCount ) )
		}
	}
}

export const UsersContainer = connect ( mapStateToProps, mapDispatchToProps ) ( Users );