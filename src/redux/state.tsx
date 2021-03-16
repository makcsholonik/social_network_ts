import { v1 } from "uuid";
import { profileReducer, ProfileReducerActionsTypes } from "./profileReducer";
import { dialogReducer, DialogReducerActionsTypes } from "./dialogReducer";

export type PostType = {
	id: string
	message: string
	likeCounts: number
}
export type DialogsType = {
	id: string
	name: string
}
export type MessagesType = {
	id: string
	message: string
}
export type ProfilePageType = {
	posts: Array<PostType>
	newPostText: string
}
export type DialogPageType = {
	dialogs: Array<DialogsType>
	messages: Array<MessagesType>
	newMessageBody: string
}
export type StateType = {
	profilePage: ProfilePageType
	dialogPage: DialogPageType
}
export type StoreType = {
	_state: StateType
	_callSubscriber: ( _state: StateType ) => void
	getState: () => StateType
	subscribe: ( observer: ( state: StateType ) => void ) => void
	dispatch: ( action: ActionsTypes ) => void
}
export type ActionsTypes = ProfileReducerActionsTypes | DialogReducerActionsTypes

export const store: StoreType = {
	_state: {
		profilePage: {
			posts: [
				{ id: v1 (), message: "Hello, I'm fine.", likeCounts: 30 },
				{ id: v1 (), message: "Hello!", likeCounts: 31 }
			],
			newPostText: ""
		},
		dialogPage: {
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
	},
	_callSubscriber () {
		console.log ( "hello" )
	},
	getState () {return this._state},
	subscribe ( observer: ( state: StateType ) => void ) {
		this._callSubscriber = observer
	},
	dispatch ( action: ActionsTypes ) {
		this._state.profilePage = profileReducer ( this._state.profilePage, action );
		this._state.dialogPage = dialogReducer ( this._state.dialogPage, action );
		this._callSubscriber ( this._state );
	}
}




