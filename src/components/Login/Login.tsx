import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/Textarea/FormControl";

type FormDataType = {
	login : string
	password : string
	rememberMe : boolean
}

export const Login = () => {
	const onSubmit = ( formData : FormDataType ) => {
		console.log ( formData )
	}
	return (
		<div>
			<h1>LOGIN</h1>
			<LoginReduxForm onSubmit={ onSubmit }/>
		</div>
	)
}

export const LoginForm = ( props : InjectedFormProps<FormDataType> ) => {
	return (
		<form onSubmit={ props.handleSubmit }>
			<div>
				<Field component={ Input } placeholder={ "login" } name={ "login" } validate={ [required] }/>
			</div>
			<div>
				<Field component={ Input } placeholder={ "password" } name={ "password" } validate={ [required] }/>
			</div>
			<div>
				<Field component={ Input } type={ "checkbox" } name={ "rememberMe" }/> remember me
			</div>
			<div>
				<button>Log In</button>
			</div>
		</form>
	)
};
// * Оборачваем наш компонент, контейнерным компонентом - LoginReduxForm
const LoginReduxForm = reduxForm<FormDataType> ( { form : "login" } ) ( LoginForm );