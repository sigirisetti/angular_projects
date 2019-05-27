import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tfx',
  templateUrl: './tfx.component.html',
  styleUrls: ['./tfx.component.css']
})
export class TfxComponent implements OnInit {

  displayedColumns = ["symbol", "spotDate", "marketBid", "marketAsk", "bid", "ask", "spread"];

  constructor() { }

  ngOnInit() {
  }

}
