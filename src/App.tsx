import React from "react";
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from './components/Dialogs/Dialogs';
import {StateType} from "./redux/state";

type PropsType = {
	state: StateType
	addPostCallback: () => void
	updateNewPostText: (newText: string) => void
}

export const App: React.FC<PropsType> = (props) => {

	return (
		<div className="app-wrapper">
			<Header/>
			<Navbar/>
			<div className="app-wrapper-content">
				<Route path={"/profile"} render={() => <Profile posts={props.state.profilePage.posts}
																addPostCallback={props.addPostCallback}
																newPostText={props.state.profilePage.newPostText}
																updateNewPostText={props.updateNewPostText}/>}/>
				<Route path={"/dialogs"} render={() => <Dialogs dialogs={props.state.dialogPage.dialogs}
																messages={props.state.dialogPage.messages}/>}/>
			</div>
		</div>
	);
}

export default App;
