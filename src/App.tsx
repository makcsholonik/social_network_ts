import React from "react";
import './App.css';
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Route } from "react-router-dom";
import { ActionsTypes } from "./redux/store";
import { Profile } from "./components/Profile/Profile";
import { RootReduxState } from "./redux/redux-store";
import { DialogsContainer } from "./components/Dialogs/DialogsContainer";

type PropsType = {
	state : RootReduxState
	dispatch : ( action : ActionsTypes ) => void
}

export const App = ( props : PropsType ) => {
	return (
		<div className="app-wrapper">
			<Header/>
			<Navbar/>
			<div className="app-wrapper-content">
				<Route path={ "/profile" } render={ () => <Profile posts={ props.state.profileReducer.posts }
																					newPostText={ props.state.profileReducer.newPostText }
																					dispatch={ props.dispatch.bind ( props.state ) }/> }/>
				<Route path={ "/dialogs" } render={ () => <DialogsContainer dialogs={ props.state.dialogReducer.dialogs }
																								messages={ props.state.dialogReducer.messages }
																								dispatch={ props.dispatch.bind ( props.state ) }
																								newMessageBody={ props.state.dialogReducer.newMessageBody }/> }/>
			</div>
		</div>
	);
}
