import React from 'react';
import s from './Header.module.css';
import { NavLink } from "react-router-dom";
import { DataType } from '../../redux/authReducer';

type HeaderPropsType = {
	data : DataType
}

export const Header = ( props : HeaderPropsType ) => {
	return (
		<header className={ s.header }>
			<img src="" alt="logo"/>
			<div className={ s.login }>
				{ props.data.isAuth ? props.data.login : <NavLink to={ "/login" }>Login</NavLink> }
			</div>
		</header>
	);
}