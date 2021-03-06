import { v1 } from "uuid";

export type DialogsType = {
	id : string
	name : string
}
export type MessagesType = {
	id : string
	message : string
}

let initialState = {
	dialogs : [
		{ id : v1 (), name : "Maxim" },
		{ id : v1 (), name : "Marta" },
		{ id : v1 (), name : "Eseniya" }
	] as Array<DialogsType>,
	messages : [
		{ id : v1 (), message : "Hello, Maxim!" },
		{ id : v1 (), message : "Hello!" },
		{ id : v1 (), message : "How do you feel?" }
	] as Array<MessagesType>
}

export type InitialStateDialogsType = typeof initialState

export type DialogReducerActionsTypes = ReturnType<typeof sendMessageAC>

export const dialogReducer = ( state : InitialStateDialogsType = initialState, action : DialogReducerActionsTypes ) : InitialStateDialogsType => {
	switch (action.type) {
		case SEND_MESSAGE:
			let body = action.newMessageBody;
			return {
				...state,
				messages : [...state.messages, { id : v1 (), message : body }],
			};
		default:
			return state;
	}
}

export const SEND_MESSAGE = "SEND-MESSAGE";

export const sendMessageAC = (newMessageBody: string) => {
	return {
		type : SEND_MESSAGE,
		newMessageBody
	} as const
}

