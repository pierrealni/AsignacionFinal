import { TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, RequestMethod, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { BooksService } from './books.service';
import { Books } from './books.model';
import { BookFilter } from '../../book-filters/shared/book-filters.model';

import 'rxjs/add/operator/map';


describe('Books Service Test', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                BaseRequestOptions,
                MockBackend,
                ConnectionBackend,
                {
                    provide: Http, useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });

    it('getList should return the data list', (done) => {
        //Arrange
        let mockBackend: MockBackend = TestBed.get(MockBackend);
        let expectedList: Books[] = [{
            id: 1,
            title: "demo",
            autor: null,
            year_published: null,
            rating: null,
            price: null,
            imgUrl: null
        }];
        let mockFilter: BookFilter={
            sortBy: "year_published",
            pageSize: "",
            pageNumber: 1,
            searchText: ""
        }
        mockBackend.connections.subscribe((connection: MockConnection) => {
            const expectedUrl = 'http://localhost:3000/books?_sort=year_published&_order=ASC&q=';
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(expectedUrl);

            connection.mockRespond(new Response(new ResponseOptions({
                body: expectedList
            })));
        });
        let http = new Http(mockBackend, TestBed.get(BaseRequestOptions));
        let service = new BooksService(http);

        //Act
        let observable = service.getList(mockFilter);

        //Assert
        observable.subscribe((result) => {
            expect(result).toBe(expectedList);
            done();
        });
    });

})