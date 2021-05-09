import React from "react";
import { DialogsType, MessagesType, sendMessageAC } from "../../redux/dialogReducer";
import { Dialogs } from "./Dialogs";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { compose, Dispatch } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

// * функции mapStateToProps и mapDispatchToProps для настройки connect
// * connect - возвращает нам новую контейнерную компоненту: отрисовывается Dialogs компонента в неё засовывыется в props
// * данные из объектов mapStateToProps и mapDispatchToProps

type MapStatePropsType = {
	dialogs : Array<DialogsType>
	messages : Array<MessagesType>
	// newMessageBody : string
	isAuth: boolean
}

type MapDispatchPropsType = {
	onSendMessageClick : (newMessageBody: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = ( state : AppStateType ) : MapStatePropsType => {
	return {
		dialogs : state.dialogPage.dialogs,
		messages : state.dialogPage.messages,
		isAuth: state.auth.isAuth
	}
}
const mapDispatchToProps = ( dispatch : Dispatch ) : MapDispatchPropsType => {
	return {
		onSendMessageClick : (newMessageBody: string) => {
			dispatch ( sendMessageAC (newMessageBody) );
		}
	}
}

// * const AuthRedirectComponent = withAuthRedirect(Dialogs) // HOC
// * export const DialogsContainer = connect ( mapStateToProps, mapDispatchToProps ) ( AuthRedirectComponent ); // connect - функция которая возвращает hoc

// * compose - берёт Dialogs и закидывает в ф-ию withAuthRedirect, получает результат и закидывает в ф-ию - connect ( mapStateToProps, mapDispatchToProps )

export default compose<React.ComponentType>(
	connect ( mapStateToProps, mapDispatchToProps ),
	withAuthRedirect
)(Dialogs);