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
	getState: any
	addPost: () => void
	updateNewPostText: ( postText: string ) => void
	subscribe: ( observer: () => void ) => void
	_callSubscriber: () => void
}

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

		},
		// sidebar: {}
	},
	getState () {
		return this._state;
	},
	addPost () {
		let newPost: PostType = {
			id: 5,
			message: this._state.profilePage.newPostText,
			likeCounts: 0
		}
		this._state.profilePage.posts.push ( newPost );
		this._state.profilePage.newPostText = ""; // обновление input'a после добавления поста
		this._callSubscriber ();
	},
	updateNewPostText ( postText: string ) {
		this._state.profilePage.newPostText = postText
		this._callSubscriber ();
	},
	subscribe ( observer ) {
		this._callSubscriber = observer;
	},
	_callSubscriber () {
		console.log ( "hello" )
	}
}


/*
let rerenderThree = () => {
	console.log ( "hello" )
};*/


/*
//типизация state
export let state: StateType = {
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

	},*!/
sidebar: {}
}
// функция добавления поста
export const addPost = () => {
	let newPost: PostType = {
		id: 5,
		message: state.profilePage.newPostText,
		likeCounts: 0
	}
	state.profilePage.posts.push ( newPost );
	state.profilePage.newPostText = ""; // обновление input'a после добавления поста
	rerenderThree ();
}
// функция передачи значения textarea
export const updateNewPostText = ( postText: string ) => {
	state.profilePage.newPostText = postText
	rerenderThree ();
}
export const subscribe = ( observer: () => void ) => {
	rerenderThree = observer;
}
*/


