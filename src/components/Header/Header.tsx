import React from 'react';
import s from './Header.module.css';
import { NavLink } from "react-router-dom";

type HeaderPropsType = {
	isAuth : boolean
	login : string
}

export const Header = ( props : HeaderPropsType ) => {
	return (
		<header className={ s.header }>
			<img src="#" alt="logo"/>
			<div className={ s.login }>
				{ props.isAuth ? props.login : <NavLink to={ "/login" }>Login</NavLink> }
			</div>
		</header>
	);
}