// fix-client.js
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "src"); // Поменяй, если надо

// Рекурсивно ищем все файлы с расширением .yopta
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

// Проверяем, есть ли 'use client' в файле
function hasUseClient(filepath) {
  const content = fs.readFileSync(filepath, "utf8");
  return content.includes("'use client'") || content.includes('"use client"');
}

// Создаём или обновляем client-wrappers.tsx в папке
function updateClientWrapper(folderPath, files) {
  if (files.length === 0) return;

  const imports = files
    .map((f, i) => {
      const baseName = path.basename(f, ".yopta");
      return `import ${baseName} from './${baseName}.yopta';`;
    })
    .join("\n");

  const exports = files.map((f) => path.basename(f, ".yopta")).join(", ");

  const wrapperContent = `'use client';

${imports}

export { ${exports} };
`;

  const wrapperPath = path.join(folderPath, "client-wrappers.tsx");
  fs.writeFileSync(wrapperPath, wrapperContent, "utf8");
  console.log(`Обновлен ${wrapperPath}`);
}

function groupByFolder(files) {
  const map = new Map();
  for (const file of files) {
    const folder = path.dirname(file);
    if (!map.has(folder)) map.set(folder, []);
    map.get(folder).push(file);
  }
  return map;
}

function main() {
  const allFiles = getAllYoptaFiles(rootDir);
  const clientFiles = allFiles.filter(hasUseClient);
  const grouped = groupByFolder(clientFiles);

  for (const [folder, files] of grouped.entries()) {
    updateClientWrapper(folder, files);
  }
  console.log("Готово, обёртки client-wrappers.tsx созданы/обновлены.");
}

main();
