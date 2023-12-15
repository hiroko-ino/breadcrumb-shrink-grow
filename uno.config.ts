import { defineConfig, presetIcons } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
        provider: 'google',
        fonts: {
          sans: 'Noto Sans JP:400,700',
      },
    }),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {
    maxWidth: {
      'breadcrumb': 'calc(100% - 360px - 36px)',
    },
  },
})