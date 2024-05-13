// preprocess.js

const fs = require('fs');

// Read the source file
const sourceCode = fs.readFileSync('src/index.js', 'utf8');

// Perform any necessary transformations
const transformedCode = sourceCode.replace(/import\s+React/g, 'import * as React');

// Write the transformed code back to the source file
fs.writeFileSync('src/index.js', transformedCode);
