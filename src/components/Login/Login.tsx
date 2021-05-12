import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/Textarea/FormControl";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

type FormDataType = {
	email : string
	password : string
	rememberMe : boolean
}

type MapStatePropsType = {
	isAuth : boolean
}

// ! sypport type
const Login = ( props : any ) => {
	const onSubmit = ( formData : FormDataType ) => {
		props.login ( formData.email, formData.password, formData.rememberMe )
	}
	if (props.isAuth) {
		return <Redirect to={ "/profile" }/>
	}

	return (
		<div>
			<h1>LOGIN</h1>
			<LoginReduxForm onSubmit={ onSubmit }/>
		</div>
	)
}
const mapStateToProps =	( state : AppStateType ) : MapStatePropsType => ({
		isAuth : state.auth.isAuth
	})
export default connect ( mapStateToProps, { login } ) ( Login );

export const LoginForm = ( props : InjectedFormProps<FormDataType> ) => {
	return (
		<form onSubmit={ props.handleSubmit }>
			<div>
				<Field component={ Input } type={ "text" } placeholder={ "email" } name={ "email" }
						 validate={ [required] }/>
			</div>
			<div>
				<Field component={ Input } type={ "password" } placeholder={ "password" } name={ "password" }
						 validate={ [required] }/>
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