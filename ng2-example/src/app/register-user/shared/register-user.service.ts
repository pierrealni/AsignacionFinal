import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterUserService {

	constructor(private http: Http) { }

	getList(): Observable<any[]> {
		return this.http.get('/api/list').map(res => res.json() as any[]);
	}
}