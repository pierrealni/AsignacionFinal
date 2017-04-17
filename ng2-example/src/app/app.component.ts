import { Component } from '@angular/core';

import { ApiService, EmitterService, EmmitterConstants } from './shared';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/jcyovera/ng2Curso2017';
  title: string;
  public isCollapsed = false;
  searchText:string;

  constructor(private api: ApiService,
  private emitterService:EmitterService) {
    this.title = this.api.title;
  }
  onSearch(event) {
        if (event.which === 13 || this.searchText == "") {
          this.emitterService.get(EmmitterConstants.SEARCHTEXT_CHANGE).emit(this.searchText);
        }
    }
}
