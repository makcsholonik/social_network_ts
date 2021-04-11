import { UsersPropsType } from "./UsersContainer";
import axios from "axios";
import { Users } from "./Users";

// export class UsersAPIComponent extends React.Component<UsersPropsType, any> {
//
// 	componentDidMount () {
// 		axios.get ( `https://social-network.samuraijs.com/api/1.0/users?page=${ this.props.currentPage }&count=${ this.props.pageSize }` ).then ( response => {
// 			this.props.setUsers ( response.data.items );
// 			this.props.setTotalUserCounts ( response.data.totalCount );
// 		} );
// 	}
//
// 	onPageChanged = ( pageNumber : number ) => {
// 		this.props.setCurrentPage ( pageNumber );
// 		axios.get ( `https://social-network.samuraijs.com/api/1.0/users?page=${ pageNumber }&count=${ this.props.pageSize }` ).then ( response => {
// 			this.props.setUsers ( response.data.items )
// 		} );
// 	}
//
// 	render () {
// 		return <Users
// 			totalUsersCount={this.props.totalUsersCount}
// 			pageSize={this.props.pageSize}
// 			currentPage={this.props.currentPage}
// 			onPageChanged={this.onPageChanged}
// 			userPage={this.props.userPage}
// 			follow={this.props.follow}
// 			unFollow={this.props.unFollow}
// 		/>
// 	}
// }
