import React from "react";
import s from "./Dialogs.module.css";
import {DialogMessage} from "./DialogMessage/DialogMessage";
import {DialogItemUser} from "./DialogItem/DialogItem";
import {DialogsType, MessagesType} from "../../redux/state";

type PropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>

}

export const Dialogs: React.FC<PropsType> = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItemUser id={d.id} name={d.name}/>)
    let messagesElements = props.messages.map(m => <DialogMessage message={m.message}/>)

    return (
        <div className={s.dialog}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.dialogMessage}>
                {messagesElements}
                <textarea></textarea>
                <button>add</button>
            </div>
        </div>
    )
}