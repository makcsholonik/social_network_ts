import React from "react";
import { Users } from "./Users";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Preloader } from "../common/Preloader/Preloader";
import {
	getUser,
	InitialStateUserType,
	setCurrentPage,
	toggleFollowingProgress,
	follow,
	unfollow
} from "../../redux/usersReducer";

class UsersContainer extends React.Component<UsersPropsType> {

	componentDidMount () {
		this.props.getUser ( this.props.currentPage, this.props.pageSize );
	}

	onPageChanged = ( pageNumber : number ) => {
		this.props.getUser ( pageNumber, this.props.pageSize );
	}

	render () {
		return (
			<>
				{ this.props.isFetching ? <Preloader/> : null }
				<Users
					totalUsersCount={ this.props.totalUsersCount }
					pageSize={ this.props.pageSize }
					currentPage={ this.props.currentPage }
					onPageChanged={ this.onPageChanged }
					userPage={ this.props.userPage }
					followingInProgress={ this.props.followingInProgress }
					follow={ this.props.follow }
					unfollow={ this.props.unfollow }
				/>
			</>
		)
	}
}

type MapStatePropsType = {
	userPage : InitialStateUserType
	pageSize : number
	totalUsersCount : number
	currentPage : number
	isFetching : boolean
	followingInProgress : Array<string>
}

type MapDispatchPropsType = {
	setCurrentPage : ( pageNumber : number ) => void
	toggleFollowingProgress : ( isFetching : boolean, userId : string ) => void
	getUser : ( currentPage : number, pageSize : number ) => void
	follow : ( id : string ) => void
	unfollow : ( id : string ) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		userPage : state.usersPage,
		pageSize : state.usersPage.pageSize,
		totalUsersCount : state.usersPage.totalUsersCount,
		currentPage : state.usersPage.currentPage,
		isFetching : state.usersPage.isFetching,
		followingInProgress : state.usersPage.followingInProgress
	}
}

export default connect ( mapStateToProps, {
	setCurrentPage,
	toggleFollowingProgress,
	getUser,
	follow,
	unfollow
} ) ( UsersContainer );
