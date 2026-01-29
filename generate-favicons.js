import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sizes = [16, 32, 64, 128, 192, 512];
const svgPath = path.join(__dirname, 'public', 'favicon.svg');

async function generateFavicons() {
    try {
        // Generate PNG favicons
        for (const size of sizes) {
            await sharp(svgPath)
                .resize(size, size)
                .png()
                .toFile(path.join(__dirname, 'public', `favicon-${size}.png`));
            console.log(`✓ Generated favicon-${size}.png`);
        }

        // Generate favicon.ico (using 32x32)
        await sharp(svgPath)
            .resize(32, 32)
            .toBuffer()
            .then(async (buffer) => {
                await sharp(buffer)
                    .png()
                    .toFile(path.join(__dirname, 'public', 'favicon.ico'));
                console.log('✓ Generated favicon.ico');
            });

        console.log('\n✅ All favicons generated successfully!');
    } catch (error) {
        console.error('❌ Error generating favicons:', error);
        process.exit(1);
    }
}

generateFavicons();
