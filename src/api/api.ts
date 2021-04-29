//DAL уровень

import axios from "axios";

const instance = axios.create ( {
	baseURL : 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials : true,
	headers : {
		"API-KEY" : "f0cc0942-0306-4a5b-86b9-c3852c7f7cf3"
	}
} )

export const usersAPI = {
	getUsers ( currentPage : number, pageSize : number ) {
		return instance.get ( `users?page=${ currentPage }&count=${ pageSize }` ).then ( response => {
			return response.data;
		} )
	},
	follow ( id : string ) {
		return instance.post ( `follow/${ id }` )
	},
	unfollow ( id : string ) {
		return instance.delete ( `follow/${ id }` )
	},
	getProfile ( userId : string ) {
		return instance.get ( `profile/${ userId }` )
	},
}
export const authAPI = {
	me () {
		return instance.get ( `auth/me` )
	}
}