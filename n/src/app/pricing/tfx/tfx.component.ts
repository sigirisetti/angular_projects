import { Component, OnInit } from '@angular/core';
import { MassQuoteService } from '../mass-quotes-service'
import { MassQuote } from '../mass-quotes';
import { massQuotesUrl } from 'src/app/globals';

@Component({
  selector: 'app-tfx',
  templateUrl: './tfx.component.html',
  styleUrls: ['./tfx.component.css']
})
export class TfxComponent implements OnInit {

  displayedColumns = ["symbol", "spotDate", "marketBid", "marketAsk", "bid", "ask", "spread"];
  massQuotes: MassQuote[] = new Array();
  

  constructor(private massQuoteService : MassQuoteService) {}

  ngOnInit() {
    this.massQuoteService.messages.subscribe(msg => {
      let added = false;
      for (let i = 0; i < this.massQuotes.length ; i++) {
        let q = this.massQuotes[i];
        if(q.symbol === msg.symbol) {
          this.massQuotes[i] = msg;
          added = true;
        }
      }
      if(!added) {
        this.massQuotes.push(msg);
      }
    });
  }

}
