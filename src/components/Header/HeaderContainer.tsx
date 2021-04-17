import React from 'react';
import { Header } from "./Header";
import axios from "axios";
import { connect } from 'react-redux';
import { DataType, InitialStateAuthType, setAuthUserData } from '../../redux/authReducer';
import { AppStateType } from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderPropsType> {

	componentDidMount () {
		axios.get ( `https://social-network.samuraijs.com/api/1.0/auth/me`, {
			withCredentials : true
		} ).then ( response => {
			if (response.data.resultCode === 0) {
				let {id, email, login} = response.data.data; // support - это вообще что?
				this.props.setAuthUserData(id, email, login);
			}
		} );
	}

	render () {
		return (
			// support - типизация
			<div>
				<Header { ...this.props }/>
			</div>
		);
	}
}

type MapStatePropsType = {
	isAuth: boolean
	login: InitialStateAuthType
}

type MapDispatchPropsType = {
	setUserData : ( data : Array<DataType> ) => void
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.data.login
	}
}

export default connect ( mapStateToProps, { setAuthUserData } ) ( HeaderContainer )