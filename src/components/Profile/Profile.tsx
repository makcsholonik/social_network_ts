import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./MyPosts/MyPosts";
import {PostType} from "../../redux/state";

export type PropsType = {
    posts: Array<PostType>
    addPostCallback: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void
}

export const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                addPostCallback={props.addPostCallback}
                newPostText={props.newPostText}
                updateNewPostText={props.updateNewPostText}
            />
        </div>
    );
}