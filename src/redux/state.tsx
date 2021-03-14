import { ChangeEvent } from "react";
import { v1 } from "uuid";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

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
	getState: any
	subscribe: ( observer: ( state: StateType ) => void ) => void
	dispatch: ( action: ActionsTypes ) => void
}
export type ActionsTypes =
	ReturnType<typeof addPostActionCreator>
	| ReturnType<typeof updateNewPostTextActionCreator>
	| ReturnType<typeof updateNewMessageBodyActionCreator>
	| ReturnType<typeof sendMessageActionCreator>

export const store: StoreType = {
	_state: {
		profilePage: {
			posts: [
				{ id: v1(), message: "Hello, I'm fine.", likeCounts: 30 },
				{ id: v1(), message: "Hello!", likeCounts: 31 }
			],
			newPostText: ""
		},
		dialogPage: {
			dialogs: [
				{ id: v1(), name: "Maxim" },
				{ id: v1(), name: "Marta" },
				{ id: v1(), name: "Eseniya" }
			],
			messages: [
				{ id: v1(), message: "Hello, Maxim!" },
				{ id: v1(), message: "Hello!" },
				{ id: v1(), message: "How do you feel?" }
			],
			newMessageBody: "",
		}
	},
	_callSubscriber () {
		console.log ( "hello" )
	},
	getState () {
		return this._state
	}, // интерфейсный метод
	subscribe ( observer ) {
		this._callSubscriber = observer
	}, // интерфейсный метод
	dispatch ( action ) {
		if (action.type === ADD_POST) {
			let newPost: PostType = {
				id: v1(),
				message: this._state.profilePage.newPostText,
				likeCounts: 0
			}
			this._state.profilePage.posts.push ( newPost );
			this._state.profilePage.newPostText = ""; // обновление input'a после добавления поста
			this._callSubscriber ( this._state );
		} else if (action.type === "UPDATE-NEW-POST-TEXT") {
			this._state.profilePage.newPostText = action.postText;
			this._callSubscriber ( this._state );
		} else if (action.type === "UPDATE-NEW-MESSAGE-BODY") {
			this._state.dialogPage.newMessageBody = action.body;
			this._callSubscriber ( this._state );
		} else if (action.type === "SEND-MESSAGE") {
			let body = this._state.dialogPage.newMessageBody;
			this._state.dialogPage.newMessageBody = "";
			this._state.dialogPage.messages.push ( { id: v1(), message: body } )
			this._callSubscriber ( this._state );
		}
	}
}

export let addPostActionCreator = ( newPostText: string ) => {
	return {
		type: ADD_POST,
		message: newPostText
	} as const
}
export let updateNewPostTextActionCreator = ( e: ChangeEvent<HTMLTextAreaElement> ) => {
	return {
		type: UPDATE_NEW_POST_TEXT,
		postText: e.currentTarget.value
	} as const
}
export let updateNewMessageBodyActionCreator = ( newMessageBody: string ) => {
	return {
		type: UPDATE_NEW_MESSAGE_BODY,
		body: newMessageBody
	} as const
}
export let sendMessageActionCreator = () => {
	return {
		type: SEND_MESSAGE,
	} as const
}




