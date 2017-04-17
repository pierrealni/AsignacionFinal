import { Component, OnInit } from '@angular/core';
import { MyCurrencyPipe } from '../shared/my-currency.pipe';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date3: Date;
  balanceAmount: any;

  constructor(private mycurpipe: MyCurrencyPipe) {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
    this.balanceAmount = this.mycurpipe.transform("1234567.89");
  }
  getBalance(value) {
    return this.mycurpipe.transform(value);
  }

}
