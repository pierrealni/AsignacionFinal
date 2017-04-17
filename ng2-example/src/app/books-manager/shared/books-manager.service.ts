import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BooksManager } from './books-manager.model';

@Injectable()
export class BooksManagerService {

	constructor(private http: Http) { }

	getList(): Observable<BooksManager[]> {
		return this.http.get('/api/list').map(res => res.json() as BooksManager[]);
	}
}