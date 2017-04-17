import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { UserProfileService } from './user-profile.service';

@Injectable()
export class LoginService {
  constructor(private userProfileService: UserProfileService, private http: Http) { }
  loginObserver: Observable<any>;
  login(username: string, password: string) {
    return this.getUser(username, password);
  }
  getUser(username: string, password: string): Observable<any> {
    let self = this;
    this.loginObserver = this.http.get('http://localhost:3000/users')
      .map((res: Response) => res.json());
    return this.loginObserver
      .map((users) => {
        var foundUser = users.find(user => user.username === username && user.password === password);
        if (foundUser) {
          self.toggleLogState(true);
        }
      });;

  }
  logout() {
    this.toggleLogState(false);
  }

  private toggleLogState(val: boolean) {
    console.log(val);
    this.userProfileService.isLoggedIn = val;
  }
}
