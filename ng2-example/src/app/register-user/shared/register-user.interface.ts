export interface RegisterUser {
	name: string;
	account:{
		email:string;
		confirm:string;
	}
}