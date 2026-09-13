import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = join(process.cwd(), 'dist', 'assets')
const files = readdirSync(dir).filter((name) => name.endsWith('.js'))
const required = '/shaoke-keli-ip/assets/duo-hero.png'
let foundRequired = false

for (const name of files) {
  const code = readFileSync(join(dir, name), 'utf8')
  if (code.includes(required)) foundRequired = true
  if (code.includes('"/assets/duo-hero.png"') || code.includes("'/assets/duo-hero.png'")) {
    throw new Error(`${name} still contains a bare /assets/duo-hero.png string`)
  }
  const bare = code.match(/["']\/assets\//g) ?? []
  if (bare.length) {
    throw new Error(`${name} still contains ${bare.length} bare "/assets/..." string(s)`)
  }
}

if (!foundRequired) {
  throw new Error(`Built JS is missing ${required}`)
}

console.log(`pages asset prefix ok (${files.length} js file(s) contain ${required})`)
