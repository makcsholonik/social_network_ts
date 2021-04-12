import React from 'react';
import { Profile } from './Profile';
import axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profileReducer";
import { AppStateType } from '../../redux/redux-store';

export class ProfileContainer extends React.Component<ProfilePropsType> {

	componentDidMount () {
		axios.get ( `https://social-network.samuraijs.com/api/1.0/profile/2` ).then ( response => {
			this.props.setUserProfile ( response.data );
		} );
	}

	render () {
		return (
			<Profile { ...this.props }  profile={this.props.profile}/>
		)
	}
}

type MapStatePropsType = {
	profile : any
};
type MapDispatchPropsType = {
	setUserProfile: (profile : null) => void
};

export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType;

const MapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return { profile : state.profilePage.profile }
}

export default connect ( MapStateToProps, { setUserProfile } ) ( ProfileContainer );