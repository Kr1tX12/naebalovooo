const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "../src");
const wrapperPath = path.join(rootDir, "client-wrappers.tsx");

function getAllYoptaFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getAllYoptaFiles(fullPath));
    } else if (file.isFile() && file.name.endsWith(".yopta")) {
      results.push(fullPath);
    }
  }
  return results;
}

function toPascalCase(str) {
  return str
    .split(/[-_]/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function hasUseClient(filepath) {
  const content = fs.readFileSync(filepath, "utf8");
  return content.includes("'use client'") || content.includes('"use client"');
}

function toRelativeImport(from, to) {
  let rel = path.relative(from, to).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = "./" + rel;
  rel = rel.replace(/\.yopta$/, "");
  return rel;
}

function main() {
  const allFiles = getAllYoptaFiles(rootDir);
  const clientFiles = allFiles.filter(hasUseClient);

  if (clientFiles.length === 0) {
    console.log('Клиентских .yopta файлов с "use client" не найдено');
    return;
  }

  const imports = [];
  const exports = [];

  for (const file of clientFiles) {
    const rawName = path.basename(file, ".yopta");
    const baseName = toPascalCase(rawName);
    const importPath = toRelativeImport(rootDir, file);
    imports.push(`import { ${baseName} } from '${importPath}';`);
    exports.push(baseName);
  }

  const wrapperContent = `'use client';

${imports.join("\n")}

export { ${exports.join(", ")} };
`;

  fs.writeFileSync(wrapperPath, wrapperContent, "utf8");
  console.log(`Обновлен общий файл ${wrapperPath}`);
}

main();
