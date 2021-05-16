import React from 'react';
import { Header } from "./Header";
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { AppStateType } from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderPropsType> {

	render () {
		return (
			<div>
				<Header { ...this.props }/>
			</div>
		);
	}
}

type MapStateToPropsType = {
	isAuth : boolean
	login : string
}

type MapDispatchToPropsType = {
	logout: () => void
}

export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = ( state : AppStateType ) : MapStateToPropsType => {
	return {
		isAuth : state.auth.isAuth,
		login : state.auth.login || ""
	}
}

export default connect ( mapStateToProps, { logout } ) ( HeaderContainer )