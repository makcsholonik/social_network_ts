import React from "react";
import './App.css';
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Route } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";
import { Dialogs } from './components/Dialogs/Dialogs';
import { ActionsTypes, StateType } from "./redux/state";

type PropsType = {
	state: StateType
	dispatch: ( action: ActionsTypes ) => void
}

export const App: React.FC<PropsType> = ( props ) => {
	return (
		<div className="app-wrapper">
			<Header/>
			<Navbar/>
			<div className="app-wrapper-content">
				<Route path={"/profile"} render={() => <Profile posts={props.state.profilePage.posts}
																				newPostText={props.state.profilePage.newPostText}
																				dispatch={props.dispatch.bind ( props.state )}/>}/>
				<Route path={"/dialogs"} render={() => <Dialogs dialogs={props.state.dialogPage.dialogs}
																				messages={props.state.dialogPage.messages}/>}/>
			</div>
		</div>
	);
}

export default App;
