import React from "react";
import { ActionsTypes, DialogsType, MessagesType, } from "../../redux/store";
import { sendMessageAC, updateNewMessageBodyAC } from "../../redux/dialogReducer";
import { Dialogs } from "./Dialogs";

type PropsType = {
	dialogs: Array<DialogsType>
	messages: Array<MessagesType>
	dispatch: ( action: ActionsTypes ) => void
	newMessageBody: string
}

export const DialogsContainer = ( props: PropsType ) => {

	let onNewMessageChange = ( body: string ) => {
		props.dispatch ( updateNewMessageBodyAC ( body ) );
	}
	let onSendMessageClick = () => {
		props.dispatch ( sendMessageAC () );
	}

	return (
		<Dialogs
			dialogs={props.dialogs}
			messages={props.messages}
			newMessageBody={props.newMessageBody}
			onNewMessageChange={onNewMessageChange}
			onSendMessageClick={onSendMessageClick}
		/>
	)
}