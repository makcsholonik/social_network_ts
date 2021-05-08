import React from "react";
import s from "./Dialogs.module.css";
import { DialogMessage } from "./DialogMessage/DialogMessage";
import { DialogItemUser } from "./DialogItem/DialogItem";
import { DialogsPropsType } from "./DialogsContainer";
import { Field, reduxForm } from "redux-form";
export const Dialogs = ( props : DialogsPropsType ) => {

	let dialogsElements = props.dialogs.map ( d => <DialogItemUser key={ d.id } id={ d.id } name={ d.name }/> );
	let messagesElements = props.messages.map ( m => <DialogMessage key={ m.id } message={ m.message }/> );

	let addNewMessage = ( values : any ) => {
		props.onSendMessageClick (values.newMessageBody)
	}

	// * Если мы не залогинены нас вернёт на страницу login
	// * if ( !props.isAuth) return <Redirect to={ "/login" }/>

	return (
		<div className={ s.dialog }>
			<div className={ s.dialogItems }>
				{ dialogsElements }
			</div>
			<div className={ s.dialogMessage }>
				<div>{ messagesElements }</div>
				<AddMessageFormRedux onSubmit={ addNewMessage }/>
			</div>
		</div>
	)
}

export const AddMessageForm = ( props : any ) => {
	return (
		<form onSubmit={ props.handleSubmit }>
			<Field component={ "textarea" } placeholder={ "Enter your message" } name={ "newMessageBody" }/>
			<button>send</button>
		</form>
	)
}
const AddMessageFormRedux = reduxForm<any> ( { form : "addMessageForm" } ) ( AddMessageForm )