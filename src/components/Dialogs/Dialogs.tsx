import React, { ChangeEvent } from "react";
import s from "./Dialogs.module.css";
import { DialogMessage } from "./DialogMessage/DialogMessage";
import { DialogItemUser } from "./DialogItem/DialogItem";
import { ActionsTypes, DialogsType, MessagesType, } from "../../redux/store";
import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from "../../redux/dialogReducer";

type PropsType = {
	dialogs: Array<DialogsType>
	messages: Array<MessagesType>
	dispatch: ( action: ActionsTypes ) => void
	newMessageBody: string
}

export const Dialogs: React.FC<PropsType> = ( props ) => {

	let dialogsElements = props.dialogs.map ( d => <DialogItemUser key={d.id} id={d.id} name={d.name}/> );
	let messagesElements = props.messages.map ( m => <DialogMessage key={m.id} message={m.message}/> );
	let newMessageBody = props.newMessageBody;

	let onNewMessageChange = ( e: ChangeEvent<HTMLTextAreaElement> ) => {
		let body = e.target.value;
		props.dispatch ( updateNewMessageBodyActionCreator ( body ) );
	}
	let onSendMessageClick = () => {
		props.dispatch ( sendMessageActionCreator () );
	}

	return (
		<div className={s.dialog}>
			<div className={s.dialogItems}>
				{dialogsElements}
			</div>
			<div className={s.dialogMessage}>
				<div>{messagesElements}</div>
				<div>
					<textarea
						value={newMessageBody}
						onChange={onNewMessageChange}
						placeholder={"Enter your message"}>
					</textarea>
				</div>
				<div>
					<button onClick={onSendMessageClick}>
						send
					</button>
				</div>
			</div>
		</div>
	)
}