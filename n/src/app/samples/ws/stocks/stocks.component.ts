import { Component, OnInit } from '@angular/core';
import { StocksQuoteService } from './stocks-quote.service'
import { StockQuote } from './stock-quote'

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stockQuotes: StockQuote[];
  displayedColumns = ["symbol", "price"];

  ngOnInit() {
  }

  constructor(private stocksQuoteService: StocksQuoteService) {
    stocksQuoteService.messages.subscribe(msg => {
      console.log(msg)
      this.stockQuotes = msg;
    });
  }


}
