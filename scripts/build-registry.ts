/**
 * Generates individual component JSON files in public/r/ from registry.json.
 *
 * Each file follows the shadcn registry-item schema so the project can be
 * served as a self-hosted registry at /r/{name}.json.
 *
 * Usage: npx tsx scripts/build-registry.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs"
import { resolve, dirname } from "path"

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..")
const REGISTRY_PATH = resolve(ROOT, "registry.json")
const OUT_DIR = resolve(ROOT, "public", "r")

interface RegistryFile {
  path: string
  type: string
}

interface RegistryItem {
  name: string
  type: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

interface Registry {
  $schema?: string
  name: string
  homepage: string
  items: RegistryItem[]
}

const registry: Registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"))

if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true })
}

let count = 0

for (const item of registry.items) {
  const outputFile = resolve(OUT_DIR, `${item.name}.json`)

  const files = item.files.map((f) => {
    const absPath = resolve(ROOT, f.path)
    const content = readFileSync(absPath, "utf-8")
    return {
      path: f.path,
      content,
      type: f.type,
    }
  })

  const registryItem: Record<string, unknown> = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    files,
  }

  if (item.dependencies?.length) {
    registryItem.dependencies = item.dependencies
  }
  if (item.devDependencies?.length) {
    registryItem.devDependencies = item.devDependencies
  }
  if (item.registryDependencies?.length) {
    registryItem.registryDependencies = item.registryDependencies
  }

  writeFileSync(outputFile, JSON.stringify(registryItem, null, 2) + "\n")
  count++
}

console.log(`Built ${count} registry items → ${OUT_DIR}`)
