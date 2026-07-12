// 一次性腳本：把 public/image 底下的 PNG/JPG 轉成同名 WebP，成功後刪除原始檔。
// 用法：node scripts/convert-images.mjs
import { readdirSync, statSync, unlinkSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const IMAGE_DIR = join(import.meta.dirname, '..', 'public', 'image')
const CONVERT_EXTS = new Set(['.png', '.jpg', '.jpeg'])

async function main() {
  const files = readdirSync(IMAGE_DIR).filter((name) => {
    const full = join(IMAGE_DIR, name)
    return statSync(full).isFile() && CONVERT_EXTS.has(extname(name).toLowerCase())
  })

  console.log(`找到 ${files.length} 個要轉檔的圖片`)

  for (const file of files) {
    const srcPath = join(IMAGE_DIR, file)
    const destPath = join(IMAGE_DIR, `${basename(file, extname(file))}.webp`)
    await sharp(srcPath).webp({ quality: 82 }).toFile(destPath)
    unlinkSync(srcPath)
    console.log(`✓ ${file} -> ${basename(destPath)}`)
  }

  console.log('完成')
}

main()
