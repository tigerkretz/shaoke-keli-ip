import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function assertPrefixedAssetPaths(): Plugin {
  return {
    name: 'assert-prefixed-asset-paths',
    generateBundle(_options, bundle) {
      const required = '/shaoke-keli-ip/assets/duo-hero.webp'
      let foundRequired = false
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk' || !fileName.endsWith('.js')) continue
        if (chunk.code.includes(required)) foundRequired = true
        if (
          chunk.code.includes('"/assets/duo-hero.webp"') ||
          chunk.code.includes("'/assets/duo-hero.webp'")
        ) {
          throw new Error(`${fileName} still contains a bare /assets/duo-hero.webp string`)
        }
        const bare = chunk.code.match(/["']\/assets\//g) ?? []
        if (bare.length) {
          throw new Error(`${fileName} still contains ${bare.length} bare "/assets/..." string(s)`)
        }
      }
      if (!foundRequired) {
        throw new Error(`Built JS is missing ${required}`)
      }
    },
  }
}

export default defineConfig({
  base: '/shaoke-keli-ip/',
  plugins: [react(), assertPrefixedAssetPaths()],
})
