import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { BooksCrudComponent } from './books-crud.component';
import { BooksCrudService } from './shared/books-crud.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

fdescribe('A Books Crud Component', () => {
	let component: BooksCrudComponent;
	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: BooksCrudService, useClass: MockBooksCrudService },
				BooksCrudComponent,
				FormBuilder
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BooksCrudComponent], (BooksCrudComponent) => {
		component = BooksCrudComponent;
	}));

	it('should have an instance ', () => {
		expect(component).toBeDefined();
	});

	it('should have an undefined action', () => {
		expect(component.action).toBe(undefined);
	})

	it('should fecth list on ngInit', () => {
		//Arrange
		let model: any = {
			Data: [{}], TotalRows: 1, TotalPages: 1
		};
		let service = TestBed.get(BooksCrudService);
		service.getBooks = () => {
			return Observable.of(model)
		}
		//Act
		component.ngOnInit();
		//Assert
		expect(component.books).toBe(model);
		expect(component.books.length).toBe(model.length);
	});
});

// Mock of the original books service
class MockBooksCrudService extends BooksCrudService {
	getBooks(): Observable<any> {
		return Observable.from([{ id: 1, name: 'One' }, { id: 2, name: 'Two' }]);
	}
}
