import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ApiService, EmitterService } from './shared';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

/* Prime NG */
import { CalendarModule } from 'primeng/primeng';

/*Components  */
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BooksComponent } from './books/books.component';
import { BooksManagerComponent } from './books-manager/books-manager.component';
import { BookFiltersComponent } from './book-filters/book-filters.component';
/* Directives and Pipes */
import { HighlightDirective} from './_directives/highlight';
import { MyCurrencyPipe } from './shared/my-currency.pipe';
import { MyCurrencyFormatterDirective } from './_directives/currency-formatter';

/* Guards & components login */
import { CanActivateAuthGuard } from './shared/can-activate.service';
import { UserProfileService} from './login/user-profile.service';
import { RouteComponent } from './shared/route.component';
import{ LoginComponent} from './login/login.component';
/* Reactive  forms */
import { RegisterUserComponent} from './register-user/register-user.component';
import { BooksCrudComponent} from './AsignacionFinal/books-crud/books-crud.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    CalendarModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BooksComponent,
    BooksManagerComponent,
    BookFiltersComponent,
    HighlightDirective,
    MyCurrencyPipe,
    MyCurrencyFormatterDirective,
    LoginComponent,
    RouteComponent,
    RegisterUserComponent,
    BooksCrudComponent
  ],
  providers: [
    ApiService,
    EmitterService,
    MyCurrencyPipe,
    CanActivateAuthGuard,
    UserProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
