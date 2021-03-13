import { ChangeEvent } from "react";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";


export type PostType = {
	id: number
	message: string
	likeCounts: number
}
export type DialogsType = {
	id: number
	name: string
}
export type MessagesType = {
	id: number
	message: string
}
export type ProfilePageType = {
	posts: Array<PostType>
	newPostText: string
}
export type DialogPageType = {
	dialogs: Array<DialogsType>
	messages: Array<MessagesType>
}
export type StateType = {
	profilePage: ProfilePageType
	dialogPage: DialogPageType

}

export type StoreType = {
	_state: StateType
	_callSubscriber: () => void
	getState: any
	subscribe: ( observer: () => void ) => void
	dispatch: ( action: ActionsTypes ) => void
}


export type ActionsTypes = ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewPostTextActionCreator>

export const store: StoreType = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: "Hello, I'm fine.", likeCounts: 30 },
				{ id: 2, message: "Hello!", likeCounts: 31 }
			],
			newPostText: ""
		},
		dialogPage: {
			dialogs: [
				{ id: 1, name: "Maxim" },
				{ id: 2, name: "Marta" },
				{ id: 3, name: "Eseniya" }
			],
			messages: [
				{ id: 1, message: "Hello, Maxim!" },
				{ id: 2, message: "Hello!" },
				{ id: 3, message: "How do you feel?" }
			]

		}
	},
	_callSubscriber () {
		console.log ( "hello" )
	},
	getState () {
		return this._state;
	}, // интерфейсный метод
	subscribe ( observer ) {
		this._callSubscriber = observer;
	}, // интерфейсный метод
	dispatch ( action ) {
		if (action.type === ADD_POST) {
			let newPost: PostType = {
				id: 5,
				message: this._state.profilePage.newPostText,
				likeCounts: 0
			}
			this._state.profilePage.posts.push ( newPost );
			this._state.profilePage.newPostText = ""; // обновление input'a после добавления поста
			this._callSubscriber ();
		} else if (action.type === "UPDATE-NEW-POST-TEXT") {
			this._state.profilePage.newPostText = action.postText
			this._callSubscriber ();
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



