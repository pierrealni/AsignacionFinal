import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { BooksCrudComponent } from './books-crud.component';
import { BooksCrudService } from './shared/books-crud.service';
//import { BooksCrud } from './shared/books-crud.model';

describe('a books-crud component', () => {
	let component: BooksCrudComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: BooksCrudService, useClass: MockBooksCrudService },
				BooksCrudComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BooksCrudComponent], (BooksCrudComponent) => {
		component = BooksCrudComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original books-crud service
class MockBooksCrudService extends BooksCrudService {
	getList(): Observable<any> {
		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
	}
}
