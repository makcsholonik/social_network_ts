import React from "react";
import './App.css';
import { Navbar } from "./components/Navbar/Navbar";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { connect } from "react-redux";
import { getAuthUserData } from "./redux/authReducer";


class App extends React.Component<MapDispatchToPropsType> {
	componentDidMount () {
		this.props.getAuthUserData ();
	}
	render () {
		return (
			<div className="app-wrapper">
				<HeaderContainer/>
				<Navbar/>
				<div className="app-wrapper-content">
					<Route path={ "/profile/:userId?" } render={ () => <ProfileContainer/> }/>
					<Route path={ "/dialogs" } render={ () => <DialogsContainer/> }/>
					<Route path={ "/users" } render={ () => <UsersContainer/> }/>
					<Route path={ "/login" } render={ () => <Login/> }/>
				</div>
			</div>
		);
	}
}

type MapDispatchToPropsType = {
	getAuthUserData: () => void
}

export default connect ( null, { getAuthUserData } ) ( App )