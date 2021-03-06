let rerenderThree = () => {
    console.log("hello")
}

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

// типизация state
export let state: StateType = {
    profilePage: {
        posts: [
            {id: 1, message: "Hello, I'm fine.", likeCounts: 30},
            {id: 2, message: "Hello!", likeCounts: 31}
        ],
        newPostText: ""
    },
    dialogPage: {
        dialogs: [
            {id: 1, name: "Maxim"},
            {id: 2, name: "Marta"},
            {id: 3, name: "Eseniya"}
        ],
        messages: [
            {id: 1, message: "Hello, Maxim!"},
            {id: 2, message: "Hello!"},
            {id: 3, message: "How do you feel?"}
        ]

    },
    // sidebar: {}
}
// функция добавления поста
export const addPost = () => {
    let newPost: PostType = {
        id: 5,
        message: state.profilePage.newPostText,
        likeCounts: 0
    }
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = ""; // обновление input'a после добавления поста
    rerenderThree();
}
// функция передачи значения textarea
export const updateNewPostText = (postText: string) => {
    state.profilePage.newPostText = postText
    rerenderThree();
}

export const subscribe = (observer: () => void) => {
    rerenderThree = observer;
}

