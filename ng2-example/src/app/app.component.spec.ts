import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { EmitterService, EmitterServiceMock } from "./shared/emitter.service";
import { EmmitterConstants } from "./shared/constants";

import { ApiService } from './shared';
import { AppComponent } from './app.component';

describe('App', () => {
  let emitterMock;
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    emitterMock = new EmitterServiceMock();
    spyOn(emitterMock, "get").and.returnValue(new EventEmitter<any>());
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ApiService, provideRoutes([]),
        EmmitterConstants,
        { provide: EmitterService, useValue: emitterMock }]
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.url).toEqual('https://github.com/jcyovera/ng2Curso2017');
  });

});
