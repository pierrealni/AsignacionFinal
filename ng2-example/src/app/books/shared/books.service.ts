import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Books } from './books.model';
import{BookFilter} from '../../book-filters/shared/book-filters.model';

@Injectable()
export class BooksService {

	constructor(private http: Http) { }

	getList(filters:BookFilter): Observable<Books[]> {
		let params = new URLSearchParams();
		params.set('_sort',String(filters.sortBy));
		params.set('_order',"ASC");
		params.set('q',String(filters.searchText));

		return this.http.get('http://localhost:3000/books',{search:params}).map(res => res.json() as Books[]);
	}
}