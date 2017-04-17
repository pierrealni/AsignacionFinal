import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {  BookFilters} from './shared/book-filters.model';
import { BookFiltersService } from './shared/book-filters.service';

@Component({
	selector: 'book-filters',
	templateUrl: 'book-filters.component.html',
	providers: [BookFiltersService]
})

export class BookFiltersComponent implements OnInit {
	bookFilters: BookFilters={
		sortFilters:[]
	}
	@Output() onUpdateFilters= new EventEmitter();

	filters = {
        from: undefined,
        to: undefined,
        createdFor: "",
        sortBy: ""
    };

	constructor(private bookFiltersService: BookFiltersService) { }

	ngOnInit() {
		this.bookFiltersService.getSortOptions().subscribe((res) => {
			console.log(res);
			this.bookFilters.sortFilters = res;
		});
		//Select Value by default to set default sort list view (not undefined error)
		this.onSelectSortBy("year_published");
	}
	onSelectSortBy(sortById: string = "year") {
		console.log(sortById)
        this.filters.sortBy = sortById;
        this.updateList();
    }
	updateList() {
        this.onUpdateFilters.emit(this.filters);
    }
}