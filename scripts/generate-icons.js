/**
 * Icon Generator Script
 *
 * Generates all required PWA icon sizes from a source SVG.
 *
 * Usage:
 *   npm install sharp
 *   node scripts/generate-icons.js
 *
 * Or use an online tool like:
 *   - https://realfavicongenerator.net/
 *   - https://www.pwabuilder.com/imageGenerator
 */

const fs = require('fs');
const path = require('path');

// Icon sizes required for PWA
const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('Sharp not installed. Install it with: npm install sharp --save-dev');
  console.log('\nAlternatively, use an online tool to generate icons from the SVG:');
  console.log('  Source: public/icons/icon.svg');
  console.log('\nRequired sizes:', ICON_SIZES.join(', '));
  console.log('\nOnline tools:');
  console.log('  - https://realfavicongenerator.net/');
  console.log('  - https://www.pwabuilder.com/imageGenerator');
  process.exit(0);
}

const SVG_PATH = path.join(__dirname, '../public/icons/icon.svg');
const OUTPUT_DIR = path.join(__dirname, '../public/icons');

async function generateIcons() {
  console.log('Generating PWA icons...\n');

  for (const size of ICON_SIZES) {
    const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);

    await sharp(SVG_PATH)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`✓ Generated ${size}x${size}`);
  }

  // Generate maskable icon (with padding for safe zone)
  const maskableSize = 512;
  const padding = Math.floor(maskableSize * 0.1); // 10% padding

  await sharp(SVG_PATH)
    .resize(maskableSize - padding * 2, maskableSize - padding * 2)
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: { r: 153, g: 69, b: 255, alpha: 1 } // #9945FF
    })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'icon-maskable-512x512.png'));

  console.log(`✓ Generated maskable 512x512`);

  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch(console.error);
