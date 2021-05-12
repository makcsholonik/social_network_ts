import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/Textarea/FormControl";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";

type FormDataType = {
	email : string
	password : string
	rememberMe : boolean
}

const Login = (props: any ) => {
	const onSubmit = ( formData : FormDataType ) => {
		props.login(formData.email, formData.password, formData.rememberMe )
	}
	return (
		<div>
			<h1>LOGIN</h1>
			<LoginReduxForm onSubmit={ onSubmit }/>
		</div>
	)
}

export default connect (null, {login}) (Login);

export const LoginForm = ( props : InjectedFormProps<FormDataType> ) => {
	return (
		<form onSubmit={ props.handleSubmit }>
			<div>
				<Field component={ Input } type={ "text" } placeholder={ "email" } name={ "email" } validate={ [required] }/>
			</div>
			<div>
				<Field component={ Input } type={ "password" } placeholder={ "password" } name={ "password" } validate={ [required] }/>
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