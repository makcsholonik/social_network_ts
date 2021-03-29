import React, { useState } from "react";
import { UsersPropsType } from "./UsersContainer";
import cl from './Users.module.css'
import { v1 } from "uuid";

export const Users = ( props : UsersPropsType ) => {

	props.setUsers ( [
		{
			id : v1 (),
			photoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXHvfFwNodq7RdvqxFOdob4l_mI4elb10pUQ&usqp=CAU',
			followed : true,
			fullName : 'Maxim',
			status : 'active',
			location : { id : v1 (), city : 'Kobrin', country : 'Belarus' }
		},
		{
			id : v1 (),
			photoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXHvfFwNodq7RdvqxFOdob4l_mI4elb10pUQ&usqp=CAU',
			followed : true,
			fullName : 'Ilya',
			status : 'active',
			location : { id : v1 (), city : 'Vienna', country : 'Austria' }
		},
		{
			id : v1 (),
			photoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXHvfFwNodq7RdvqxFOdob4l_mI4elb10pUQ&usqp=CAU',
			followed : false,
			fullName : 'Fedor',
			status : 'inactive',
			location : { id : v1 (), city : 'Berlin', country : 'Germany' }
		}]
	)

	return (
		<div>
			{
				props.users.map ( u => <div key={ u.id }>
					<span>
						<div>
							<img src={ u.photoUrl } alt="freeman" className={ cl.userPhoto }/>
						</div>
						<div>
							{ u.followed
								? <button onClick={ () => {props.unFollow ( u.id )} }>Unfollow</button>
								: <button onClick={ () => {props.follow ( u.id )} }>follow</button> }
						</div>
						</span>
					<span>
						<span>
							<div>{ u.fullName }</div>
							<div>{ u.status }</div>
						</span>
						<span>
							<div>{ u.location.country }</div>
							<div>{ u.location.city }</div>
						</span>
						</span>
				</div> )
			}
		</div>
	)
}