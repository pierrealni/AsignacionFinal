import { Component, OnInit } from '@angular/core';

import { BooksManager } from './shared/books-manager.model';
import { BooksManagerService } from './shared/books-manager.service';

@Component({
	selector: 'books-manager',
	templateUrl: 'books-manager.component.html',
	providers: [BooksManagerService]
})

export class BooksManagerComponent implements OnInit {
	booksManager: BooksManager[] = [];
	constructor() { }

	ngOnInit() {
	}
}