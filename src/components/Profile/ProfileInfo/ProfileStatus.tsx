import React, { ChangeEvent, useState } from "react";

type PropsProfileStatusType = {
	status : string
	updateStatusProfile : ( status : string ) => void
}

export const ProfileStatus = ( props : PropsProfileStatusType ) => {

	const [editMode, setEditMode] = useState<boolean> ( false );
	const [status, setStatus] = useState<string> ( props.status );

	const activateEditMode = () => {
		setEditMode ( true );
	};
	const deactivateEditMode = () => {
		setEditMode ( false );
		props.updateStatusProfile ( status );
	};
	const onStatusChange = ( e : ChangeEvent<HTMLInputElement> ) => {
		setStatus ( e.currentTarget.value );
	};
	return (
		<>
			{ !editMode &&
         <div>
             <span onDoubleClick={ activateEditMode }>{ props.status || "no status" }</span>
         </div>
			}
			{ editMode &&
         <div>
             <input autoFocus={ true } onBlur={ deactivateEditMode } onChange={ onStatusChange } value={ status }/>
         </div>
			}
		</>
	);
};