import { Component, OnInit, Input } from '@angular/core';

import { Books } from './shared/books.model';
import { BookFilter } from '../book-filters/shared/book-filters.model';
import { BooksService } from './shared/books.service';
import { EmitterService, EmmitterConstants} from '../shared/index';

@Component({
	selector: 'books',
	templateUrl: 'books.component.html',
	styleUrls: ['./books.component.scss'],
	providers: [BooksService]
})

export class BooksComponent implements OnInit {
	books: Books[] = [];
	filters: BookFilter = { pageSize: "100", pageNumber: 1, sortBy:null, searchText:'' };
	isInitDone: boolean = false;
	searchObservable: any;

	@Input() set sortBy(value: string) {
		this.filters.sortBy = value;
	}

	constructor(private booksService: BooksService,
	private emitterService: EmitterService,
	) { }

	ngOnInit() {
		this.UpdateList();
		this.isInitDone = true;
		this.searchObservable = this.emitterService.get(EmmitterConstants.SEARCHTEXT_CHANGE).subscribe(SearchText => {
            if (this.filters.searchText === SearchText) return false;
            this.filters.searchText = SearchText;
            this.UpdateList();
        });
	}
	ngOnChanges() {
		console.log("updating");
		if (this.isInitDone) this.UpdateList();
	}
	UpdateList() {
		this.booksService.getList(this.filters).subscribe((res) => {
			this.books = res;
		});
	}
}