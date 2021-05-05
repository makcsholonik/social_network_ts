import React from "react";
import { Field, reduxForm } from "redux-form";

export const Login = () => {
	const onSubmit = (formData) =>{}
	return (
		<div>
			<h1>LOGIN</h1>
			<LoginReduxForm onSubmit={onSubmit}/>
		</div>
	)
}

export const LoginForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={ "input" } placeholder={ "login" } name={ "login" }/>
			</div>
			<div>
				<Field component={ "input" } placeholder={ "password" } name={ "password" }/>
			</div>
			<div>
				<Field component={ "input" } type={ "checkbox" } name={ "rememberMe" }/> remember me
			</div>
			<div>
				<button>Log In</button>
			</div>
		</form>
	)
};
// * Оборачваем наш компонент, контейнерным компонентом - LoginReduxForm
export const LoginReduxForm = reduxForm ( { form : "login" } ) ( LoginForm );