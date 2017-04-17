import { RouterModule, Routes } from '@angular/router';

//import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BooksManagerComponent } from './books-manager/books-manager.component';
//import { CanActivateAuthGuard } from './shared/can-activate.service';
//import { RouteComponent } from './shared/route.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent} from './register-user/register-user.component';
import { BooksCrudComponent} from './AsignacionFinal/books-crud/books-crud.component';

const routes: Routes = [
  { path: '', component: BooksManagerComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'books', component: BooksCrudComponent }
  /*{
    path: 'books',
    component: RouteComponent,
    canActivate: [CanActivateAuthGuard],
    canActivateChild: [CanActivateAuthGuard],
    children: [
      { path: '', component: BooksManagerComponent }
    ]
  }*/
];


export const routing = RouterModule.forRoot(routes);
