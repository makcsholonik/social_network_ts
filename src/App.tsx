import React from "react";
import './App.css';
import { Navbar } from "./components/Navbar/Navbar";
import { Route } from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { DialogsContainer } from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


export const App = () => {
	return (
		<div className="app-wrapper">
			<HeaderContainer/>
			<Navbar/>
			<div className="app-wrapper-content">
				<Route path={ "/profile/:userId?" } render={ () => <ProfileContainer/> }/>
				<Route path={ "/dialogs" } render={ () => <DialogsContainer/> }/>
				<Route path={ "/users" } render={ () => <UsersContainer/> }/>
			</div>
		</div>
	);
}
