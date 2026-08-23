/**
 * Turn camera originals into the two WebP sizes the site actually serves.
 *
 *   photo-originals/cat.jpg  ->  public/photos/cat.webp      (1600px)
 *                                public/photos/cat-800.webp  (800px)
 *
 * Run it with `npm run photos` after dropping new files into
 * `photo-originals/`, then point `src` in src/data/photography.js at the
 * 1600px file. The 800px one is picked up on its own by `photoSrcSet` in
 * src/lib/utils.js, so phones download roughly a quarter of the bytes.
 *
 * `photo-originals/` is git-ignored: a 6MB phone photo has no business in the
 * repo, and nothing on the site ever links to one.
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'photo-originals';
const OUTPUT_DIR = 'public/photos';

/** The two widths every photo is published at, longest edge in pixels. */
const SIZES = [
  { suffix: '', longestEdge: 1600, quality: 80 },
  { suffix: '-800', longestEdge: 800, quality: 78 },
];

const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

const asMb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;
const asKb = (bytes) => `${Math.round(bytes / 1024)}KB`;

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  let entries;
  try {
    entries = await readdir(SOURCE_DIR);
  } catch {
    console.error(`No ${SOURCE_DIR}/ directory — create it and drop your full-size photos in.`);
    process.exitCode = 1;
    return;
  }

  const sources = entries.filter((name) => SOURCE_EXTENSIONS.has(path.extname(name).toLowerCase()));

  if (sources.length === 0) {
    console.log(`Nothing to do: ${SOURCE_DIR}/ has no images in it.`);
    return;
  }

  let bytesIn = 0;
  let bytesOut = 0;

  for (const file of sources.sort()) {
    const from = path.join(SOURCE_DIR, file);
    const name = path.basename(file, path.extname(file));
    bytesIn += (await stat(from)).size;

    const written = [];
    for (const { suffix, longestEdge, quality } of SIZES) {
      const to = path.join(OUTPUT_DIR, `${name}${suffix}.webp`);

      // `fit: 'inside'` keeps the aspect ratio and never enlarges a small
      // original, so the longest edge is a ceiling rather than a target.
      const { size } = await sharp(from)
        .rotate() // honour the EXIF orientation phones write
        .resize({ width: longestEdge, height: longestEdge, fit: 'inside', withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toFile(to);

      bytesOut += size;
      written.push(`${path.basename(to)} ${asKb(size)}`);
    }

    console.log(`${file} -> ${written.join(' | ')}`);
  }

  console.log(`\n${sources.length} photo(s): ${asMb(bytesIn)} -> ${asMb(bytesOut)}`);
}

await main();
