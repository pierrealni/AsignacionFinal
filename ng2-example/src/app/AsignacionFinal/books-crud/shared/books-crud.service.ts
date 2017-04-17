import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Books } from '../../../books/shared/books.model';

@Injectable()
export class BooksCrudService {

	constructor(private http: Http) { }

	getBooks(): Observable<Books[]> {
		return this.http.get('http://localhost:3000/books').map(res => res.json() as Books[]);
	}

	//CREATE
	createBook(book: Books): any{
		return this.http.post('http://localhost:3000/books',book).map(res => res.json() as Books[]);
	}

	//UPDATE

	//DELETE
}