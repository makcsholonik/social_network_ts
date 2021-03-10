import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from "./redux/state";
import App from './App';
import { BrowserRouter } from "react-router-dom";


export let rerenderThree = () => {
	ReactDOM.render(
		<BrowserRouter>
			<App
				state={store.getState()}
				addPostCallback={store.addPost.bind(store)}
				updateNewPostText={store.updateNewPostText.bind(store)}
			/>
		</BrowserRouter>, document.getElementById('root'))
}

rerenderThree();
store.subscribe(rerenderThree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
