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
	dialogs:[
		{ id:v1 (), name:"Maxim" },
		{ id:v1 (), name:"Marta" },
		{ id:v1 (), name:"Eseniya" }
	] as Array<DialogsType>,
	messages:[
		{ id:v1 (), message:"Hello, Maxim!" },
		{ id:v1 (), message:"Hello!" },
		{ id:v1 (), message:"How do you feel?" }
	] as Array<MessagesType>,
	newMessageBody:"",
}

export type InitialStateDialogsType = typeof initialState

export type DialogReducerActionsTypes = ReturnType<typeof updateNewMessageBodyAC> | ReturnType<typeof sendMessageAC>

export const dialogReducer = ( state : InitialStateDialogsType = initialState, action : DialogReducerActionsTypes ) : InitialStateDialogsType => {
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_BODY:
			return {
				...state,
				newMessageBody:action.body
			};
		case SEND_MESSAGE:
			let body = state.newMessageBody;
			return {
				...state,
				messages:[...state.messages, { id:v1 (), message:body }],
				newMessageBody:""
			};
		default:
			return state;
	}
}

export const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
export const SEND_MESSAGE = "SEND-MESSAGE";

export const updateNewMessageBodyAC = ( newMessageBody : string ) => {
	return {
		type:UPDATE_NEW_MESSAGE_BODY,
		body:newMessageBody
	} as const
}
export const sendMessageAC = () => {
	return {
		type:SEND_MESSAGE,
	} as const
}

