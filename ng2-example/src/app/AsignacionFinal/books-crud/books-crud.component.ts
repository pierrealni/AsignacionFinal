import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Books } from '../../books/shared/books.model';
import { BooksCrudService } from './shared/books-crud.service';

@Component({
	selector: 'books-crud',
	templateUrl: 'books-crud.component.html',
	providers: [BooksCrudService]
})

export class BooksCrudComponent implements OnInit {
	books: Books[] = [];
	book: FormGroup;
	//newBook : Books;

	constructor(private booksCrudService: BooksCrudService, private fb: FormBuilder) { }

	ngOnInit() {
		this.booksCrudService.getBooks().subscribe((res) => {
			this.books = res;
		});
		this.book = this.fb.group({
			author: ['', [Validators.required, Validators.minLength(2)]],
			
		});
	}

	onSubmit({ value, valid }: { value: Books, valid: boolean }) {
		console.log(value, valid);
	}

}