import React from "react";
import axios from "axios";
import { Users } from "./Users";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Preloader } from "../common/Preloader/Preloader";
import {
	follow,
	InitialStateUserType,
	setCurrentPage,
	setTotalUserCounts,
	setUsers,
	toggleIsFetching,
	unfollow, ItemsType
} from "../../redux/usersReducer";

class UsersContainer extends React.Component<UsersPropsType> {

	componentDidMount () {
		this.props.toggleIsFetching ( true );
		axios.get ( `https://social-network.samuraijs.com/api/1.0/users?page=${ this.props.currentPage }&count=${ this.props.pageSize }` ).then ( response => {
			this.props.toggleIsFetching ( false );
			this.props.setUsers ( response.data.items );
			this.props.setTotalUserCounts ( response.data.totalCount );
		} );
	}

	onPageChanged = ( pageNumber : number ) => {
		this.props.toggleIsFetching ( true );
		this.props.setCurrentPage ( pageNumber );
		axios.get ( `https://social-network.samuraijs.com/api/1.0/users?page=${ pageNumber }&count=${ this.props.pageSize }` ).then ( response => {
			this.props.toggleIsFetching ( false );
			this.props.setUsers ( response.data.items )
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
}

type MapDispatchPropsType = {
	follow : ( userId : string ) => void
	unfollow : ( userId : string ) => void
	setUsers : ( users : Array<ItemsType> ) => void
	setCurrentPage : ( pageNumber : number ) => void
	setTotalUserCounts : ( totalCount : number ) => void
	toggleIsFetching : ( isFetching : boolean ) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		userPage : state.usersPage,
		pageSize : state.usersPage.pageSize,
		totalUsersCount : state.usersPage.totalUsersCount,
		currentPage : state.usersPage.currentPage,
		isFetching : state.usersPage.isFetching
	}
}

export default connect ( mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUserCounts, toggleIsFetching} ) ( UsersContainer );
