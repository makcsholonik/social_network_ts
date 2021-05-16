import React from "react";
import { Users } from "./Users";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Preloader } from "../common/Preloader/Preloader";
import {
	follow,
	requestUser,
	InitialStateUserType,
	setCurrentPage,
	toggleFollowingProgress,
	unfollow
} from "../../redux/usersReducer";
import { compose } from "redux";
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers
} from "../../redux/usersSelectors";

class UsersContainer extends React.Component<UsersPropsType> {

	componentDidMount () {
		this.props.requestUser ( this.props.currentPage, this.props.pageSize );
	}

	onPageChanged = ( pageNumber : number ) => {
		this.props.requestUser ( pageNumber, this.props.pageSize );
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
	requestUser : ( currentPage : number, pageSize : number ) => void
	follow : ( id : string ) => void
	unfollow : ( id : string ) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		// userPage : state.usersPage,
		// pageSize : state.usersPage.pageSize,
		// totalUsersCount : state.usersPage.totalUsersCount,
		// currentPage : state.usersPage.currentPage,
		// isFetching : state.usersPage.isFetching,
		// followingInProgress : state.usersPage.followingInProgress
		userPage : getUsers ( state ),
		pageSize : getPageSize ( state ),
		totalUsersCount : getTotalUsersCount ( state ),
		currentPage : getCurrentPage ( state ),
		isFetching : getIsFetching ( state ),
		followingInProgress : getFollowingInProgress ( state )
	}
}


// export default connect ( mapStateToProps, {
// 	setCurrentPage,
// 	toggleFollowingProgress,
// 	getUser,
// 	follow,
// 	unfollow
// } ) ( UsersContainer );

export default compose<React.ComponentType> (
	connect ( mapStateToProps, {
		setCurrentPage, toggleFollowingProgress, requestUser, follow, unfollow
	} )
) ( UsersContainer )