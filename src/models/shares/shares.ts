/**
 * Representation of a formatted share data
 */
interface Share {
  open: number
  prevClose: number
  range: string
  volume: number
  bid: number
  bidVolume: number
  offer: number
  offerVolume: number
}

interface SharesToBuy {
  price: number
  quantity: number
}

export { Share , SharesToBuy}
