import axios from "axios";

const instance = axios.create ( {
	baseURL : 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials : true
} )

export const getUsers = ( currentPage : number, pageSize : number ) => {
	return instance.get ( `users?page=${ currentPage }&count=${ pageSize }` ).then ( response => {
		return response.data;
	} )
}