const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.resolve(__dirname, 'public/icons');
const logoPath = path.resolve(__dirname, 'public/logo2.jpg');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

async function generateIcons() {
  for (const size of sizes) {
    const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    
    // Create a square icon with emerald background and centered logo
    const padding = Math.round(size * 0.1); // 10% padding
    const logoSize = size - (padding * 2);
    
    // Resize logo to fit
    const resizedLogo = await sharp(logoPath)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toBuffer();
    
    // Create the final icon with emerald background
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 } // White background for clean look
      }
    })
    .composite([
      {
        input: resizedLogo,
        top: padding,
        left: padding,
      }
    ])
    .png()
    .toFile(outputPath);
    
    console.log(`Generated: icon-${size}x${size}.png`);
  }
  
  console.log('\nAll PWA icons generated successfully!');
}

generateIcons().catch(console.error);
