import { readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { extname, join, relative, resolve } from 'node:path'
import sharp from 'sharp'

const ROOT = resolve(import.meta.dirname, '..')
const DIRS = ['public/projects', 'public/documents/cert', 'public/assets/images']
const EXTS = new Set(['.png', '.jpg', '.jpeg', '.jfif', '.JPG'])

async function collect(dir, out = []) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await collect(full, out)
    } else if (EXTS.has(extname(entry.name))) {
      out.push(full)
    }
  }
  return out
}

async function compress(file) {
  const info = await stat(file)
  const ext = extname(file).toLowerCase()
  const input = await readFile(file)
  const pipeline = sharp(input, { failOn: 'none' })
  if (ext === '.png') {
    pipeline.png({ compressionLevel: 9, palette: true, effort: 10 })
  } else {
    pipeline.jpeg({ quality: 82, mozjpeg: true })
  }
  const data = await pipeline.toBuffer()
  if (data.length >= info.size) return { bytesSaved: 0, unchanged: true }
  await writeFile(file, data)
  return { bytesSaved: info.size - data.length }
}

const files = []
for (const dir of DIRS) await collect(resolve(ROOT, dir), files)

let totalBefore = 0
let totalSaved = 0
const rows = []
for (const file of files) {
  let result
  try {
    result = await compress(file)
  } catch (err) {
    process.stdout.write(`  SKIP (${err.code || 'error'}): ${relative(ROOT, file)}\n`)
    continue
  }
  totalSaved += result.bytesSaved
  rows.push({ file, saved: result.bytesSaved, unchanged: result.unchanged })
  const rel = relative(ROOT, file)
  if (result.bytesSaved > 0) {
    process.stdout.write(`  ${(result.bytesSaved / 1024).toFixed(0).padStart(7)} KB  ${rel}\n`)
  }
}

totalBefore = totalSaved + (await Promise.all(files.map((f) => stat(f)))).reduce((a, s) => a + s.size, 0)
console.log(`\n${files.length} images scanned. Saved ${(totalSaved / 1024).toFixed(1)} KB of ${(totalBefore / 1024).toFixed(1)} KB (${((totalSaved / totalBefore) * 100).toFixed(1)}%)`)
