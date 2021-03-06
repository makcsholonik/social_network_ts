import React from "react";
import {NavLink} from "react-router-dom";

export type DialogItemUserType = {
    id: number
    name: string
}

export const DialogItemUser: React.FC<DialogItemUserType> = (props) => {
    return (
        <div>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    );
}

