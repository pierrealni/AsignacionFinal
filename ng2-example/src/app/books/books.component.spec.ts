import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { BooksComponent } from './books.component';
import { BooksService } from './shared/books.service';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { EmitterService, EmitterServiceMock } from "../shared/emitter.service";
import { EmmitterConstants } from "../shared/constants";

describe('a books component', () => {
	let component: BooksComponent;
	let emitterMock;
	// register all needed dependencies
	beforeEach(() => {
		emitterMock = new EmitterServiceMock();
		spyOn(emitterMock, "get").and.returnValue(new EventEmitter<any>());
		TestBed.configureTestingModule({
			imports: [HttpModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: BooksService, useClass: MockBooksService },
				BooksComponent,
				EmmitterConstants,
				{ provide: EmitterService, useValue: emitterMock }
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BooksComponent], (BooksComponent) => {
		component = BooksComponent;
	}));

	it('should have an instance ', () => {
		expect(component).toBeDefined();
	});
	it('should have pagesize of 100', () => {
		expect(component.filters.pageSize).toBe("100");
	})
	it('should fecth list on ngInit', () => {
		//Arrange
		let model: any={
			Data:[{}], TotalRows:1, TotalPages:1
		};
		let service= TestBed.get(BooksService);
		service.getList=()=>{
			return Observable.of(model)
		}
		//Act
		component.ngOnInit();
		//Assert
		expect(component.books).toBe(model);
		expect(component.books.length).toBe(model.length);
		expect(emitterMock.get).toHaveBeenCalled();
		expect(emitterMock.get).toHaveBeenCalledWith(EmmitterConstants.SEARCHTEXT_CHANGE);
	});
});

	// Mock of the original books service
	class MockBooksService extends BooksService {
		getList(): Observable<any> {
			return Observable.from([{ id: 1, name: 'One' }, { id: 2, name: 'Two' }]);
		}
	}
