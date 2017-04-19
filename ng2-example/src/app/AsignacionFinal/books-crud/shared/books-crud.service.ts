import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Book } from './book.model';

@Injectable()
export class BooksCrudService {

	constructor(private http: Http) { }

	getBooks(): Observable<Book[]> {
		return this.http.get('http://localhost:3000/books').map(res => res.json() as Book[]);
	}

	//CREATE
	createBook(book: Book): any{
		return this.http.post('http://localhost:3000/books',book).map(res => res.json() as Book[]);
	}

	//UPDATE
	updateBook(book: Book): any{
		return this.http.put(`http://localhost:3000/books/${book.id}`,book).map(res => res.json() as Book[]);
	}

	//DELETE
	deleteBook(book: Book): any{
		return this.http.delete(`http://localhost:3000/books/${book.id}`).map(res => res.json());
	}
}

