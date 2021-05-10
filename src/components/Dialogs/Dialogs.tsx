import React from "react";
import s from "./Dialogs.module.css";
import { DialogMessage } from "./DialogMessage/DialogMessage";
import { DialogItemUser } from "./DialogItem/DialogItem";
import { DialogsPropsType } from "./DialogsContainer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea } from "../common/Textarea/FormControl";


export const Dialogs = ( props : DialogsPropsType ) => {

	let dialogsElements = props.dialogs.map ( d => <DialogItemUser key={ d.id } id={ d.id } name={ d.name }/> );
	let messagesElements = props.messages.map ( m => <DialogMessage key={ m.id } message={ m.message }/> );

	let addNewMessage = ( formData : FormDataType ) => {
		props.onSendMessageClick ( formData.newMessageBody )
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

type FormDataType = {
	newMessageBody : string
}

const maxLength10 = maxLengthCreator ( 10 );

export const AddMessageForm = ( props : InjectedFormProps<FormDataType> ) => {
	return (
		<form onSubmit={ props.handleSubmit }>
			<Field component={ Textarea } placeholder={ "Enter your message" } name={ "newMessageBody" }
					 validate={ [required, maxLength10] }/>
			<button>send</button>
		</form>
	)
}
const AddMessageFormRedux = reduxForm<FormDataType> ( { form : "addMessageForm" } ) ( AddMessageForm )