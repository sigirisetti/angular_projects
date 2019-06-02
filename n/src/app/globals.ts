'use strict';

export const restApiBase: string = "http://localhost:8888/gui-mock"
export const wsBase: string = "ws://localhost:8888/gui-mock"


/* Web Sockets */
// Mass Quotes
export const massQuotesUrl: string = wsBase + "/massquotes"
// Samples
export const samplesUrl: string = wsBase + "/name"


/* REST API */
export const tfxCurrenciesUrl: string = restApiBase + "/tfxCurrencies"
