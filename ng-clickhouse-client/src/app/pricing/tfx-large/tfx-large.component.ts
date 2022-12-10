import { Component, OnInit } from '@angular/core';
import { MassQuote } from '../mass-quotes';

@Component({
  selector: 'app-tfx-large',
  templateUrl: './tfx-large.component.html',
  styleUrls: ['./tfx-large.component.css']
})
export class TfxLargeComponent implements OnInit {

  displayedColumns = ["symbol", "spotDate", "marketBid", "marketAsk", "bid", "ask", "spread"];

  tfxPrices: MassQuote[];

  constructor() { }

  ngOnInit() {
  }


  onRowClicked(row: any) {
  }

}
