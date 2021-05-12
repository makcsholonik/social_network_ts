import React from 'react';
import { Header } from "./Header";
import { connect } from 'react-redux';
import { getAuthUserData, logout } from '../../redux/authReducer';
import { AppStateType } from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderPropsType> {

	componentDidMount () {
		this.props.getAuthUserData ();
	}

	render () {
		return (
			<div>
				<Header { ...this.props }/>
			</div>
		);
	}
}

type MapStatePropsType = {
	isAuth : boolean
	login : string
}

type MapDispatchPropsType = {
	getAuthUserData : () => void
	// ! support type
	logout: () => void
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		isAuth : state.auth.isAuth,
		login : state.auth.login || ""
	}
}

export default connect ( mapStateToProps, { getAuthUserData, logout } ) ( HeaderContainer )