import React from "react";
import { DialogsType, MessagesType, sendMessageAC, updateNewMessageBodyAC } from "../../redux/dialogReducer";
import { Dialogs } from "./Dialogs";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Dispatch } from "redux";
import { Redirect } from "react-router";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

// функции mapStateToProps и mapDispatchToProps для настройки connect
// connect - возвращает нам новую контейнерную компоненту: отрисовывается Dialogs компонента в неё засовывыется в props
// данные из объектов mapStateToProps и mapDispatchToProps

type MapStatePropsType = {
	dialogs : Array<DialogsType>
	messages : Array<MessagesType>
	newMessageBody : string
	isAuth: boolean
}

type MapDispatchPropsType = {
	onNewMessageChange : ( body : string ) => void
	onSendMessageClick : () => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		dialogs : state.dialogPage.dialogs,
		messages : state.dialogPage.messages,
		newMessageBody : state.dialogPage.newMessageBody,
		isAuth: state.auth.isAuth
	}
}
const mapDispatchToProps = ( dispatch : Dispatch ) : MapDispatchPropsType => {
	return {
		onNewMessageChange : ( body : string ) => {
			dispatch ( updateNewMessageBodyAC ( body ) )
		},
		onSendMessageClick : () => {
			dispatch ( sendMessageAC () );
		}
	}
}

const AuthRedirectComponent = withAuthRedirect(Dialogs)

export const DialogsContainer = connect ( mapStateToProps, mapDispatchToProps ) ( AuthRedirectComponent );

