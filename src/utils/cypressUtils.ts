/**
 * formatCypressId returns a string that can be used as a Cypress data ID
 * selector (e.g. data-cy)
 */
export function formatCypressId(input: string): string {
  // TODO: add unit tests when this package enables Jest
  return input.toLowerCase().replace(' ', '-') // hyphenate the input
}
