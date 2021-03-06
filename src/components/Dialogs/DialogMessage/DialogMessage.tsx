import React from "react";

export type DialogMessageType = {
    message: string
}

export const DialogMessage: React.FC<DialogMessageType> = (props) => {
    return (
        <div>
                {props.message}
        </div>

        
    )
}
