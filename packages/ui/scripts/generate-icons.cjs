// scripts/generate-bs-icons.js
const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../src/icons/index.ts');
const iconSet = 'bs';

// Get all exported names from the module
const icons = Object.keys(require(`react-icons/${iconSet}`));

// Map icon names to valid identifiers
const iconExports = icons
  .filter(name => name.startsWith('Bs'))
  .map(name => {
    // Remove 'Bs' prefix
    const baseName = name.slice(2);
    
    // Convert to valid identifier:
    // 1. If starts with number, prefix with 'Icon'
    // 2. Convert to PascalCase
    const validName = baseName.replace(/^(\d)/, 'Icon$1')
                             .replace(/([a-z])([A-Z])/g, '$1$2')
                             .replace(/[^a-zA-Z0-9_]/g, '');

    return `export { ${name} as ${validName} } from 'react-icons/${iconSet}';`;
  });

const output = `export { Loading } from "./Loading";
// Auto-generated file - DO NOT EDIT DIRECTLY
${iconExports.join('\n')}
`;

fs.writeFileSync(outputPath, output);
console.log(`Generated ${iconExports.length} valid icon exports`);