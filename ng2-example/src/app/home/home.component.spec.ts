import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { MyCurrencyPipe } from '../shared/my-currency.pipe';

describe('Home', () => {
  let myCurrencyPipeMock={
    transform(){}
  };
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    spyOn(myCurrencyPipeMock, "transform").and.returnValue("$ 1121");

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ provideRoutes([]),
        { provide: MyCurrencyPipe, useValue: myCurrencyPipeMock }]
    });
  });

  it('should have an instance', () => {
    let fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    let component = fixture.debugElement.componentInstance;
    expect(component).toBeDefined();
  });

});
