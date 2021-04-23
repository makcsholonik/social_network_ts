import React from "react";
import { Users } from "./Users";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Preloader } from "../common/Preloader/Preloader";
import {
	follow,
	InitialStateUserType,
	ItemsType,
	setCurrentPage,
	setTotalUserCounts,
	setUsers, toggleFollowingProgress,
	toggleIsFetching,
	unfollow
} from "../../redux/usersReducer";
import { getUsers } from "../../api/api";

class UsersContainer extends React.Component<UsersPropsType> {

	componentDidMount () {
		this.props.toggleIsFetching ( true );
		getUsers ( this.props.currentPage, this.props.pageSize ).then ( data => {
			this.props.toggleIsFetching ( false );
			this.props.setUsers ( data.items );
			this.props.setTotalUserCounts ( data.totalCount );
		} );
	}

	onPageChanged = ( pageNumber : number ) => {
		this.props.toggleIsFetching ( true );
		this.props.setCurrentPage ( pageNumber );
		getUsers ( pageNumber, this.props.pageSize ).then ( data => {
			this.props.toggleIsFetching ( false );
			this.props.setUsers ( data.items )
		} );
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
					follow={ this.props.follow }
					unfollow={ this.props.unfollow }
					followingInProgress={ this.props.followingInProgress }
					toggleFollowingProgress={ this.props.toggleFollowingProgress }
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
	followingInProgress : boolean
}

type MapDispatchPropsType = {
	follow : ( userId : string ) => void
	unfollow : ( userId : string ) => void
	setUsers : ( users : Array<ItemsType> ) => void
	setCurrentPage : ( pageNumber : number ) => void
	setTotalUserCounts : ( totalCount : number ) => void
	toggleIsFetching : ( isFetching : boolean ) => void
	toggleFollowingProgress : ( isFetching : boolean ) => void
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
	follow,
	unfollow,
	setUsers,
	setCurrentPage,
	setTotalUserCounts,
	toggleIsFetching,
	toggleFollowingProgress
} ) ( UsersContainer );
