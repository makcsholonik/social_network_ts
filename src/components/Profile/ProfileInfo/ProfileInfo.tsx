import React from "react";
import s from "./ProfileInfo.module.css"


export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src="https://image.freepik.com/free-vector/nature-background-with-mountain-and-field_104785-409.jpg"
                    alt=""/>
            </div>
            <div className={s.description}>
                <img src="#" alt=""/>
                avatar + description
            </div>
        </div>
    )
}