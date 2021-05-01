import React, { ChangeEvent } from "react";

type PropsProfileStatusType = {
	status : string
	updateStatusProfile : ( status : string ) => void
}


export class ProfileStatus extends React.Component<PropsProfileStatusType> {

	state = {
		editMode : false,
		status : this.props.status
	}
	activateEditMode = () => {
		this.setState ( {
			editMode : true
		} )
	}
	deactivateEditMode = () => {
		this.setState ( {
			editMode : false
		} );
		this.props.updateStatusProfile ( this.state.status );
	}
	onStatusChange = ( e : ChangeEvent<HTMLInputElement> ) => {
		this.setState ( {
			status : e.currentTarget.value
		} )
	}

	render () {
		return (
			<>
				{ !this.state.editMode &&
            <div>
                <span onDoubleClick={ this.activateEditMode }>{ this.props.status || "no status" }</span>
            </div>
				}
				{ this.state.editMode &&
            <div>
                <input onChange={ this.onStatusChange } autoFocus={ true } onBlur={ this.deactivateEditMode }
                       value={ this.state.status }/>
            </div>
				}
			</>
		)
	}

}