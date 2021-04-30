import React, { ChangeEvent } from "react";
import s from "./Dialogs.module.css";
import { DialogMessage } from "./DialogMessage/DialogMessage";
import { DialogItemUser } from "./DialogItem/DialogItem";
import { DialogsPropsType } from "./DialogsContainer";
import { Redirect } from "react-router";

export const Dialogs = ( props : DialogsPropsType ) => {

	let dialogsElements = props.dialogs.map ( d => <DialogItemUser key={ d.id } id={ d.id } name={ d.name }/> );
	let messagesElements = props.messages.map ( m => <DialogMessage key={ m.id } message={ m.message }/> );
	let newMessageBody = props.newMessageBody;

	let onNewMessageChangeHandler = ( e : ChangeEvent<HTMLTextAreaElement> ) => {
		let body = e.target.value;
		props.onNewMessageChange ( body );
	}
	let onSendMessageClickHandler = () => {
		props.onSendMessageClick ();
	}

	// Если мы не залогинены нас вернёт на страницу login
	if ( !props.isAuth) return <Redirect to={ "/login" }/>


	return (
		<div className={ s.dialog }>
			<div className={ s.dialogItems }>
				{ dialogsElements }
			</div>
			<div className={ s.dialogMessage }>
				<div>{ messagesElements }</div>
				<div>
					<textarea
						value={ newMessageBody }
						onChange={ onNewMessageChangeHandler }
						placeholder={ "Enter your message" }>
					</textarea>
				</div>
				<div>
					<button onClick={ onSendMessageClickHandler }>
						send
					</button>
				</div>
			</div>
		</div>
	)
}