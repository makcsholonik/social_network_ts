import React from 'react';
import { Profile } from './Profile';
import axios from "axios";
import { connect } from "react-redux";
import { ProfileType, setUserProfile } from "../../redux/profileReducer";
import { AppStateType } from '../../redux/redux-store';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Preloader } from "../common/Preloader/Preloader";

// import react-router/react-router-dom

type PathParamsType = {
	userId : string // number
};
type MapStatePropsType = {
	profile : ProfileType | null
};
type MapDispatchPropsType = {
	setUserProfile : ( profile : ProfileType ) => void
};

export type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

export class ProfileContainer extends React.Component<PropsType> {

	componentDidMount () {
		debugger
		let userId  = this.props.match.params.userId;
		if (!userId) {
			userId = '2'
		}
		axios.get ( `https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then ( response => {
			this.props.setUserProfile ( response.data );
		} );
	}

	render () {
		if (!this.props.profile) {
			return <Preloader/>
		}
		return (
			<Profile { ...this.props } profile={ this.props.profile }/>
		)
	}
}

const MapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		profile : state.profilePage.profile
	}
}

const WithUrlDataContainer = withRouter ( ProfileContainer );

export default connect ( MapStateToProps, { setUserProfile } ) ( WithUrlDataContainer );