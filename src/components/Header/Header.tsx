import React from 'react';
import s from './Header.module.css';
import { NavLink } from "react-router-dom";

type HeaderPropsType = {
	isAuth : boolean
	login : string
	logout: () => void
}

export const Header = ( props : HeaderPropsType ) => {
	return (
		<header className={ s.header }>
			<img src="#" alt="logo"/>
			<div className={ s.login }>
				{ props.isAuth
					? <div>{ props.login }
						<button onClick={props.logout}>Log out</button>
					</div>
					: <NavLink to={ "/login" }>Login</NavLink> }
			</div>
		</header>
	);
}