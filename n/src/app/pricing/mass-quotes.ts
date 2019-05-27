export class MassQuote {
    symbol: String;
    exchangeId: number;
    customerId: String;
    sessionId: String;
    pricingProfileId: number;
    instrumentType: String;
    deliverable: boolean;
    settleDate: Date;
    spotDate: String;
    bid: number;
    ask: number;
    tfxLarge: boolean;
    spread: number;
}