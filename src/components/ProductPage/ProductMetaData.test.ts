import { calcNetAssetValueDivergence } from './ProductMetaData'

describe('calcNetAssetValueDivergence()', () => {
  test('should calculate NAV divergence as a positive percentage when price greater', () => {
    expect(
      calcNetAssetValueDivergence({
        nav: 106.15252903365426,
        price: 107.80252903365426,
      })
    ).toBe(1.5543671121362497)
  })
  test('should calculate NAV divergence as a negative percentage when NAV greater', () => {
    expect(
      calcNetAssetValueDivergence({
        nav: 108.87252903365426,
        price: 107.80252903365426,
      })
    ).toBe(-0.9828007207118693)
  })
  test('should return 0 when missing nav', () => {
    expect(
      calcNetAssetValueDivergence({
        nav: 0,
        price: 107.80252903365426,
      })
    ).toBe(0)
  })
  test('should return 0 when missing price', () => {
    expect(
      calcNetAssetValueDivergence({
        nav: 108.87252903365426,
        price: 0,
      })
    ).toBe(0)
  })
})
