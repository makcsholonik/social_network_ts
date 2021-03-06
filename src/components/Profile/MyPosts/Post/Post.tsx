import React from 'react';
import s from './Post.module.css';

export type PostType = {
    message: string
    likeCounts: number
}

export const Post: React.FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://misanec.ru/wp-content/uploads/2016/07/m1000x1000.jpg" alt=""/>
            {props.message}
            <div>
                <span>Like {props.likeCounts}</span>
            </div>
        </div>
    );
}