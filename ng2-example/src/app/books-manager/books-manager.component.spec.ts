import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { BooksManagerComponent } from './books-manager.component';
import { BooksManagerService } from './shared/books-manager.service';

describe('a books-manager component', () => {
	let component: BooksManagerComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: BooksManagerService, useClass: MockBooksManagerService },
				BooksManagerComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BooksManagerComponent], (BooksManagerComponent) => {
		component = BooksManagerComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original books-manager service
class MockBooksManagerService extends BooksManagerService {
	getList(): Observable<any> {
		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
	}
}
