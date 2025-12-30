import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/images/original');
const OUTPUT_BASE = path.join(__dirname, '../public/images');

// Velikosti pro různé použití
const SIZES = {
  thumbnail: { width: 400, quality: 80, suffix: 'thumb' },
  medium: { width: 800, quality: 85, suffix: 'medium' },
  large: { width: 1400, quality: 90, suffix: 'large' },
};

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function optimizeImage(inputPath, filename) {
  console.log(`Processing: ${filename}`);

  const nameWithoutExt = path.parse(filename).name;

  for (const [sizeName, config] of Object.entries(SIZES)) {
    const outputDir = path.join(OUTPUT_BASE, sizeName);
    await ensureDir(outputDir);

    const outputPath = path.join(outputDir, `${nameWithoutExt}.webp`);

    try {
      await sharp(inputPath)
        .resize(config.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({ quality: config.quality })
        .toFile(outputPath);

      const stats = await fs.stat(outputPath);
      console.log(`  ✓ ${sizeName}: ${(stats.size / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`  ✗ Error processing ${sizeName}:`, err.message);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  try {
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    console.log(`Found ${imageFiles.length} images to process\n`);

    let processed = 0;
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      await optimizeImage(inputPath, file);
      processed++;
      console.log(`Progress: ${processed}/${imageFiles.length}\n`);
    }

    console.log('✅ All images optimized successfully!');
    console.log(`\nGenerated:`);
    console.log(`  - ${imageFiles.length} thumbnails (400px)`);
    console.log(`  - ${imageFiles.length} medium images (800px)`);
    console.log(`  - ${imageFiles.length} large images (1400px)`);
    console.log(`  Total: ${imageFiles.length * 3} optimized images`);

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
