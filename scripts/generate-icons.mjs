import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ICON_SIZES = {
  icon: 1024,
  adaptive: 1024,
  splash: 1242,
  favicon: 48
};

async function generateIcons() {
  const sourcePath = join(__dirname, '../src/assets/Icon_app.png');
  
  try {
    // Verifica se o arquivo fonte existe
    if (!existsSync(sourcePath)) {
      console.error('Arquivo fonte não encontrado:', sourcePath);
      return;
    }

    // Gera o ícone principal
    await sharp(sourcePath)
      .resize(ICON_SIZES.icon, ICON_SIZES.icon, {
        fit: 'contain',
        background: { r: 33, g: 29, b: 40, alpha: 1 } // #211d28
      })
      .toFile(join(__dirname, '../assets/icon.png'));
    console.log('✓ Ícone principal gerado');

    // Gera o ícone adaptativo para Android
    await sharp(sourcePath)
      .resize(ICON_SIZES.adaptive, ICON_SIZES.adaptive, {
        fit: 'contain',
        background: { r: 33, g: 29, b: 40, alpha: 1 } // #211d28
      })
      .toFile(join(__dirname, '../assets/adaptive-icon.png'));
    console.log('✓ Ícone adaptativo gerado');

    // Gera a imagem de splash
    await sharp(sourcePath)
      .resize(ICON_SIZES.splash, ICON_SIZES.splash, {
        fit: 'contain',
        background: { r: 33, g: 29, b: 40, alpha: 1 } // #211d28
      })
      .toFile(join(__dirname, '../assets/splash-icon.png'));
    console.log('✓ Splash screen gerada');

    // Gera o favicon
    await sharp(sourcePath)
      .resize(ICON_SIZES.favicon, ICON_SIZES.favicon, {
        fit: 'contain',
        background: { r: 33, g: 29, b: 40, alpha: 1 } // #211d28
      })
      .toFile(join(__dirname, '../assets/favicon.png'));
    console.log('✓ Favicon gerado');

    console.log('\nTodos os ícones foram gerados com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar os ícones:', error);
  }
}

generateIcons(); 