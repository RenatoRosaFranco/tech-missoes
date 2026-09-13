/**
 * Polyfill for `URL.canParse` on runtimes that do not expose it yet.
 *
 * Next.js and recent dependencies call `URL.canParse`. This module loads
 * early in bootstrap to avoid a `TypeError` on older environments.
 *
 * @packageDocumentation
 */

if (!("canParse" in URL)) {
  /**
   * Reports whether `url` (and optional `base`) form a valid address.
   *
   * @param {string} url - Absolute or relative URL.
   * @param {string} [base] - Base used when `url` is relative.
   * @returns {boolean} `true` if `new URL(url, base)` does not throw.
   */
  URL.canParse = function canParse(url, base) {
    try {
      return !!new URL(url, base);
    } catch {
      return false;
    }
  };
}
