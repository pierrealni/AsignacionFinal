import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { BookFiltersComponent } from './book-filters.component';
import { BookFiltersService } from './shared/book-filters.service';

describe('a book-filters component', () => {
	let component: BookFiltersComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: BookFiltersService, useClass: MockBookFiltersService },
				BookFiltersComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BookFiltersComponent], (BookFiltersComponent) => {
		component = BookFiltersComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original book-filters service
class MockBookFiltersService extends BookFiltersService {
	getList(): Observable<any> {
		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
	}
}
