import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Books } from '../../books/shared/books.model';
import { BooksCrudService } from './shared/books-crud.service';

@Component({
	selector: 'books-crud',
	templateUrl: 'books-crud.component.html',
	styleUrls: ['./books-crud.component.scss'],
	providers: [BooksCrudService]
})

export class BooksCrudComponent implements OnInit {
	books: Books[] = [];
	bookForm: FormGroup;
	action: string = undefined;

	constructor(private booksCrudService: BooksCrudService, private fb: FormBuilder) { }

	ngOnInit() {
		this.booksCrudService.getBooks().subscribe((res) => {
			this.books = res;
		});
		this.bookForm = this.fb.group({
			id: ['', []],
			title: ['', [Validators.required, Validators.minLength(5)]],
			author: ['', [Validators.required, Validators.minLength(5)]],
			year_published: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
			rating: ['', [Validators.required, Validators.pattern(/^[+-]?\d+(\.\d+)?$/)]],
			price: ['', [Validators.required, Validators.pattern(/^[+-]?\d+(\.\d+)?$/)]]

		});
	}

	onSubmit({ value, valid }: { value: Books, valid: boolean }) {
		console.log(valid);
		switch (this.action) {
			case 'add':
				this.booksCrudService.createBook(value).subscribe((res) => {
					console.log(JSON.stringify(res));
					this.reload();
				});
				break;
			case 'edit':
				this.booksCrudService.updateBook(value).subscribe((res) => {
					console.log(JSON.stringify(res));
					this.reload();
				});
				break;
		}

		//console.log(value, valid);
	}

	delete(book: Books) {
		this.booksCrudService.deleteBook(book).subscribe((res) => {
			console.log(JSON.stringify(res));
			this.reload();
		});
	}

	edit(editionBook: Books) {
		this.action = 'edit';
		Object.keys(editionBook).forEach(name => {
			if (this.bookForm.controls[name]) {
				this.bookForm.controls[name].patchValue(editionBook[name]);
			}
		});
	}

	add() {
		this.bookForm.reset();
		this.action = 'add';
	}

	reload() {
		this.booksCrudService.getBooks().subscribe((res) => {
			this.books = res;
		});
		this.bookForm.reset();
		this.action = undefined;
	}

}