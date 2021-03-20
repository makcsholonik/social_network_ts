import { ActionsTypes, DialogPageType } from "./store";
import { v1 } from "uuid";

export const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
export const SEND_MESSAGE = "SEND-MESSAGE";

export type DialogReducerActionsTypes =
	ReturnType<typeof updateNewMessageBodyActionCreator>
	| ReturnType<typeof sendMessageActionCreator>

let initialState = {
	dialogs: [
		{ id: v1 (), name: "Maxim" },
		{ id: v1 (), name: "Marta" },
		{ id: v1 (), name: "Eseniya" }
	],
	messages: [
		{ id: v1 (), message: "Hello, Maxim!" },
		{ id: v1 (), message: "Hello!" },
		{ id: v1 (), message: "How do you feel?" }
	],
	newMessageBody: "",
}

export const dialogReducer = ( state: DialogPageType = initialState, action: ActionsTypes ) : DialogPageType => {
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_BODY:
			state.newMessageBody = action.body;
			return state;
		case SEND_MESSAGE:
			let body = state.newMessageBody;
			state.newMessageBody = "";
			state.messages.push ( { id: v1 (), message: body } );
			return state;
		default:
			return state;
	}
}

export const updateNewMessageBodyActionCreator = ( newMessageBody: string ) => {
	return {
		type: UPDATE_NEW_MESSAGE_BODY,
		body: newMessageBody
	} as const
}
export const sendMessageActionCreator = () => {
	return {
		type: SEND_MESSAGE,
	} as const
}

