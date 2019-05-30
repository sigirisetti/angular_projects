import { Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from "rxjs";
import { MassQuote } from './mass-quotes';
import { webSocket } from 'rxjs/webSocket' // for RxJS 6, for v5 use Observable.webSocket
import * as globals from '../globals'

@Injectable({
    providedIn: 'root'
})
export class MassQuoteService implements OnInit {

    disconnected = false;
    public messages: Subject<MassQuote> = new Subject();
    massQuotes: Map<string, Array<MassQuote>> = new Map();


    constructor() {
        this.getMassQuotes();
    }

    ngOnInit() {
    }

    getMassQuotes() {
        let subject = webSocket(globals.massQuotesUrl);
        subject.subscribe(
            (msg) => this.setData(msg),
            (err) => this.handleError(err),
            () => this.serverDisconnected()
        );
    }

    setData(q) {
        this.disconnected = false;
        let payload = q.payload;
        let key = this.getKey(payload);
        let arr = this.massQuotes.get(key);
        if (arr != null) {
            for (let entry of arr) {
                this.updateData(q.dataType, entry, payload)
            }
        } else {
            arr = new Array();
            let massquote = new MassQuote();
            this.updateData(q.dataType, massquote, payload)
            arr.push(massquote);
            this.massQuotes.set(key, arr);
        }
    }

    updateData(dataType, massquote, payload) {
        massquote.symbol = payload.symbol;
        massquote.settleDate = payload.settleDate;

        if (dataType === "com.ssk.ng.guimock.ws.MarketData") {
            console.log("Market data")
            massquote.marketBid = payload.marketBid;
            massquote.marketAsk = payload.marketAsk;
        } else if (dataType === "com.ssk.ng.guimock.ws.MassQuotes") {
            console.log("Mass Quote")
            massquote.exchangeId = payload.exchangeId;
            massquote.customerId = payload.customerId;
            massquote.sessionId = payload.sessionId;
            massquote.pricingProfileId = payload.pricingProfileId;
            massquote.instrumentType = payload.instrumentType;
            massquote.deliverable = payload.deliverable;
            massquote.spotDate = payload.spotDate;
            massquote.tfxLarge = payload.tfxLarge;

            massquote.bid = payload.bid;
            massquote.ask = payload.ask;
            massquote.spread = payload.spread;
        } else {
            console.log("Unknown datatype : {}", dataType)
        }
        this.messages.next(massquote);
    }

    getKey<MassQuote>(massquote) {
        return massquote.symbol;
    }

    handleError(err) {
        console.log(err)
        this.reconnect()
    }

    serverDisconnected() {
        console.log("Server disconnected")
        this.disconnected = true;
        this.reconnect()
    }

    reconnect() {
        let that = this;
        setTimeout(function () {
            console.log("Trying to reconnect..")
            that.getMassQuotes();
        }, 2000);
    }
}
