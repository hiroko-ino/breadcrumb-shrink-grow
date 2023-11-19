import { defineConfig } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
        provider: 'google',
        fonts: {
        sans: 'Noto Sans JP',
      },
    }),
  ],
})