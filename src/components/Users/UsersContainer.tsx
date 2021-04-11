import React from "react";
import { AppStateType } from "../../redux/redux-store";
import { Dispatch } from "redux";
import {
	followAC,
	InitialStateUserType,
	setCurrentPageAC,
	setTotalUserCountsAC,
	setUsersAC,
	unFollowAC,
	UserType
} from "../../redux/usersReducer";
import axios from "axios";
import { Users } from "./Users";
import { connect } from "react-redux";

class UsersAPI extends React.Component<UsersPropsType, any> {

	componentDidMount () {
		axios.get ( `https://social-network.samuraijs.com/api/1.0/users?page=${ this.props.currentPage }&count=${ this.props.pageSize }` ).then ( response => {
			this.props.setUsers ( response.data.items );
			this.props.setTotalUserCounts ( response.data.totalCount );
		} );
	}

	onPageChanged = ( pageNumber : number ) => {
		this.props.setCurrentPage ( pageNumber );
		axios.get ( `https://social-network.samuraijs.com/api/1.0/users?page=${ pageNumber }&count=${ this.props.pageSize }` ).then ( response => {
			this.props.setUsers ( response.data.items )
		} );
	}

	render () {
		return <Users
			totalUsersCount={ this.props.totalUsersCount }
			pageSize={ this.props.pageSize }
			currentPage={ this.props.currentPage }
			onPageChanged={ this.onPageChanged }
			userPage={ this.props.userPage }
			follow={ this.props.follow }
			unFollow={ this.props.unFollow }
		/>
	}
}

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
	setCurrentPage : ( pageNumber : number ) => void
	setTotalUserCounts : ( totalCount : number ) => void
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
		setCurrentPage : ( pageNumber : number ) => {
			dispatch ( setCurrentPageAC ( pageNumber ) )
		},
		setTotalUserCounts : ( totalCount : number ) => {
			dispatch ( setTotalUserCountsAC ( totalCount ) )
		}
	}
}

export const UsersContainer = connect ( mapStateToProps, mapDispatchToProps ) ( UsersAPI );
