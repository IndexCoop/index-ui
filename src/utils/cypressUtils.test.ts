import { formatCypressId } from './cypressUtils'

describe('formatCypressId', () => {
  test('should downcase capitalized words', () => {
    expect(formatCypressId('Foo')).toBe('foo')
  })
  test('should hyphenate multiple words', () => {
    expect(formatCypressId('foo bar')).toBe('foo-bar')
  })
  test('should create a valid cypress ID for My Assets', () => {
    expect(formatCypressId('My Assets')).toBe('my-assets')
  })
})
