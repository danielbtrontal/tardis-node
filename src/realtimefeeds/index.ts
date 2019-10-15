import { RealTimeFeed } from './realtimefeed'
import { Exchange } from '../types'
import { BitmexRealTimeFeed } from './bitmex'
import { BinanceRealTimeFeed, BinanceJerseyRealTimeFeed, BinanceUSRealTimeFeed, BinanceFuturesRealTimeFeed } from './binance'
import { BinanceDexRealTimeFeed } from './binancedex'
import { BitfinexRealTimeFeed } from './bitfinex'
import { BitflyerRealTimeFeed } from './bitflyer'
import { BitstampRealTimeFeed } from './bitstamp'
import { CoinbaseRealTimeFeed } from './coinbase'
import { CryptofacilitiesRealTimeFeed } from './cryptofacilities'
import { DeribitRealTimeDataFeed } from './deribit'
import { FtxRealTimeFeed } from './ftx'
import { GeminiRealTimeFeed } from './gemini'
import { KrakenRealTimeFeed } from './kraken'
import { OkexRealTimeFeed } from './okex'

export * from './realtimefeed'

const realTimeFeedsMap: {
  [key in Exchange]?: new () => RealTimeFeed
} = {
  bitmex: BitmexRealTimeFeed,
  binance: BinanceRealTimeFeed,
  'binance-jersey': BinanceJerseyRealTimeFeed,
  'binance-us': BinanceUSRealTimeFeed,
  'binance-dex': BinanceDexRealTimeFeed,
  'binance-futures': BinanceFuturesRealTimeFeed,
  bitfinex: BitfinexRealTimeFeed,
  'bitfinex-derivatives': BitfinexRealTimeFeed,
  bitflyer: BitflyerRealTimeFeed,
  bitstamp: BitstampRealTimeFeed,
  coinbase: CoinbaseRealTimeFeed,
  cryptofacilities: CryptofacilitiesRealTimeFeed,
  deribit: DeribitRealTimeDataFeed,
  ftx: FtxRealTimeFeed,
  gemini: GeminiRealTimeFeed,
  kraken: KrakenRealTimeFeed,
  okex: OkexRealTimeFeed
}

export function getRealTimeFeedFactory(exchange: Exchange): new () => RealTimeFeed {
  if (realTimeFeedsMap[exchange]) {
    return realTimeFeedsMap[exchange]!
  }

  throw new Error(`not supported exchange ${exchange}`)
}

export function createRealTimeFeed(exchange: Exchange) {
  const RealTimeFeedClass = getRealTimeFeedFactory(exchange)

  return new RealTimeFeedClass()
}

export function setRealTimeFeedFactory(exchange: Exchange, realTimeFeedFactory: new () => RealTimeFeed) {
  realTimeFeedsMap[exchange] = realTimeFeedFactory
}