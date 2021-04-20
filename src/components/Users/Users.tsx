import React from "react";
import cl from './Users.module.css';
import userPhoto from "../../assets/img/users.png";
import { InitialStateUserType } from "../../redux/usersReducer";
import { NavLink } from "react-router-dom";

type PropsUserType = {
	totalUsersCount : number
	pageSize : number
	currentPage : number
	onPageChanged : any // support
	userPage : InitialStateUserType
	follow : ( userId : string ) => void
	unfollow : ( userId : string ) => void
}

export const Users = ( props : PropsUserType ) => {

	let pagesCount = Math.ceil ( props.totalUsersCount / props.pageSize );
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push ( i )
	}

	return (
		<div>
			<div>
				{ pages.map ( p => {
					return (
						<span className={ props.currentPage === p ? cl.selectedPage: '' }
								onClick={ ( e ) => { props.onPageChanged ( p )} }>
							{ p }
						</span>)
				} ) }
			</div>
			{
				props.userPage.users.map ( u => <div key={ u.id }>
					<span>
						<div>
							<NavLink to={'./profile/' + u.id}>
								<img
									src={ u.photos.small !== null ? u.photos.small : userPhoto }
									alt=''
									className={ cl.userPhoto }
								/>
							</NavLink>
						</div>
						<div>
							{ u.followed
								? <button onClick={ () => {props.unfollow ( u.id )} }>Unfollow</button>
								: <button onClick={ () => {props.follow ( u.id )} }>Follow</button> }
						</div>
					</span>
					<span>
						<span>
							<div>{ u.name }</div>
							<div>{ u.status }</div>
						</span>
						<span>
							<div>{ "u.location.country" }</div>
							<div>{ "u.location.city" }</div>
						</span>
					</span>
				</div> )
			}
		</div>
	)
}

