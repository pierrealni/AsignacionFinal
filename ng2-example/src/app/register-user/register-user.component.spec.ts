import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { RegisterUserComponent } from './register-user.component';
import { RegisterUserService } from './shared/register-user.service';

describe('a register-user component', () => {
	let component: RegisterUserComponent;
	let fb;
	 fb = new FormBuilder();
	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule,ReactiveFormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: RegisterUserService, useClass: MockRegisterUserService },
				RegisterUserComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([RegisterUserComponent], (RegisterUserComponent) => {
		component = RegisterUserComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original register-user service
class MockRegisterUserService extends RegisterUserService {
	getList(): Observable<any> {
		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
	}
}
