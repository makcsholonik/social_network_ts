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
import { initializeApp } from "./redux/appReducer";
import { AppStateType } from "./redux/redux-store";
import { Preloader } from "./components/common/Preloader/Preloader";


class App extends React.Component<AppPropsType> {
	componentDidMount () {
		this.props.initializeApp ();
	}

	render () {
		if ( !this.props.initialized) {
			return <Preloader/>
		}
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

type MapStateToPropsType = {
	initialized : boolean
}
type MapDispatchToPropsType = {
	initializeApp : () => void
}
export type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = ( state : AppStateType ) : MapStateToPropsType => ({
	initialized : state.app.initialized
})


export default connect ( mapStateToProps, { initializeApp } ) ( App );