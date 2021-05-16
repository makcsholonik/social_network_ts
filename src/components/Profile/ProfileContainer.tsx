import React from 'react';
import { Profile } from './Profile';
import { connect } from "react-redux";
import { getStatusProfile, getUserProfile, ProfileType, updateStatusProfile } from "../../redux/profileReducer";
import { AppStateType } from '../../redux/redux-store';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Preloader } from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

// * import react-router/react-router-dom

type PathParamsType = {
	userId : string // number
};
type MapStatePropsType = {
	profile : ProfileType | null
	status : string
	autorizedUserId : number | null
	isAuth : boolean

};
type MapDispatchPropsType = {
	getUserProfile : ( userId : string ) => void
	getStatusProfile : ( userId : string ) => void
	updateStatusProfile : ( status : string ) => void
};

export type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

export class ProfileContainer extends React.Component<PropsType> {

	componentDidMount () {
		let userId = this.props.match.params.userId;
		if ( !userId) {
			// ! support
			// @ts-ignore
			userId = this.props.autorizedUserId
		}
		this.props.getUserProfile ( userId );
		this.props.getStatusProfile ( userId );
	}

	render () {
		if ( !this.props.profile) {
			return <Preloader/>
		}
		return (
			<Profile
				{ ...this.props }
				profile={ this.props.profile }
				status={ this.props.status }
				updateStatusProfile={ this.props.updateStatusProfile }
			/>
		)
	}
}


const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		profile : state.profilePage.profile,
		status : state.profilePage.status,
		autorizedUserId : state.auth.id,
		isAuth : state.auth.isAuth
	}
}

// * const WithUrlDataContainer = withRouter ( ProfileContainer);
// * export default withAuthRedirect(connect ( mapStateToProps, { getUserProfile } ) ( WithUrlDataContainer ));

export default compose<React.ComponentType> (
	connect ( mapStateToProps, { getUserProfile, getStatusProfile, updateStatusProfile } ),
	withRouter,
	withAuthRedirect,
) ( ProfileContainer );
