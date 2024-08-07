const fs = require('fs');
const path = require('path');
const { transformFileSync } = require('@babel/core');

const srcDir = 'src';
const libDir = 'lib';

if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir);
}

function processDirectory(srcPath, libPath) {
  const files = fs.readdirSync(srcPath);
  for (const file of files) {
    const srcFilePath = path.join(srcPath, file);
    const libFilePath = path.join(libPath, file);
    const stat = fs.statSync(srcFilePath);
    if (stat.isDirectory()) {
      if (!fs.existsSync(libFilePath)) {
        fs.mkdirSync(libFilePath);
      }
      processDirectory(srcFilePath, libFilePath);
    } else {
      if (path.extname(file) === '.tsx') {
        const { code } = transformFileSync(srcFilePath, {
          presets: [
            // '@babel/preset-env',
            // '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            // '@babel/plugin-transform-react-jsx',
            // '@babel/plugin-transform-typescript',
            ["./css-module-transform", {  }]
          ],
        });
        fs.writeFileSync(libFilePath, code);
      } else {
        fs.copyFileSync(srcFilePath, libFilePath);
      }
    }
  }
}

processDirectory(srcDir, libDir);