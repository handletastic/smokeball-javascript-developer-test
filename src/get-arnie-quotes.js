const { httpGet } = require('./mock-http-interface');

/**
 * Executes a HTTP GET request on each of the URLs, transforms each of the HTTP responses
 * according to the challenge instructions and returns the results.
 *
 * @param {string[]} urls - The urls to be requested
 * @return {Promise<Array<Object>>} A promise which resolves to a results array containing
 *         objects with either 'Arnie Quote' (success) or 'FAILURE' (error) keys
 *
 * @example
 * const results = await getArnieQuotes(['http://example.com/quote1', 'http://example.com/quote2']);
 * // Returns: [
 * //   { 'Arnie Quote': 'Get to the chopper' },
 * //   { 'FAILURE': 'Your request has been terminated' }
 * // ]
 */
const getArnieQuotes = async (urls) => {
  // Use Promise.all for parallel execution to meet performance requirements (<400ms)
  // Sequential execution would take 800ms+ for 4 URLs (200ms each)
  const responses = await Promise.all(urls.map(url => httpGet(url)));

  return responses.map(response => {
    const { message } = JSON.parse(response.body);
    return response.status === 200
      ? { 'Arnie Quote': message }
      : { 'FAILURE': message };
  });
};

module.exports = {
  getArnieQuotes,
};
