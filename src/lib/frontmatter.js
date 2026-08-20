/**
 * Minimal front-matter parser.
 *
 * Supports the small YAML subset the blog posts actually use — enough to
 * avoid pulling in a parser dependency, and small enough to read in a minute:
 *
 *   ---
 *   title: API Testing 101
 *   date: 2026-05-04
 *   draft: false
 *   tags: [api, postman]
 *   ---
 *
 * Values may be quoted. `tags` also accepts a dash list on following lines.
 */

/**
 * Convert a raw scalar into a boolean, number or string.
 *
 * @param {string} raw
 */
function parseScalar(raw) {
  const value = raw.trim().replace(/^['"]|['"]$/g, '');

  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value !== '' && !Number.isNaN(Number(value)) && /^\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }

  return value;
}

/**
 * Split a raw markdown file into its front-matter data and body.
 *
 * @param {string} source full file contents
 * @returns {{ data: Record<string, unknown>, content: string }}
 */
export function parseFrontmatter(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source.trim());

  if (!match) return { data: {}, content: source };

  const [, block, content] = match;
  const data = {};
  let currentListKey = null;

  for (const line of block.split(/\r?\n/)) {
    if (line.trim() === '') continue;

    // Continuation of a dash list started by the previous key.
    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && currentListKey) {
      data[currentListKey].push(parseScalar(listItem[1]));
      continue;
    }

    const pair = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!pair) continue;

    const [, key, rawValue] = pair;

    // `key:` with nothing after it opens a dash list.
    if (rawValue.trim() === '') {
      data[key] = [];
      currentListKey = key;
      continue;
    }

    currentListKey = null;

    // Inline array: [one, two]
    const inlineArray = /^\[(.*)\]$/.exec(rawValue.trim());
    if (inlineArray) {
      data[key] = inlineArray[1]
        .split(',')
        .map((item) => parseScalar(item))
        .filter((item) => item !== '');
      continue;
    }

    data[key] = parseScalar(rawValue);
  }

  return { data, content: content ?? '' };
}
