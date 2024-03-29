// const generator = require("@babel/generator");
// const parser = require("@babel/parser");
// const traverse = require("@babel/traverse");
// const types = require('@babel/types')
const fs = require("fs");
const p = require("path");
const getRemoteModulePathMap = require("./getRemoteModuleMap");
// function replace() {
//     const code = fs.readFileSync(p.join(__dirname, './home.js'), 'utf-8')
//     const remoteModulePathMap = getRemoteModulePathMap()
//     const ast = parser.parse(code, {
//         sourceType: "module",
//         allowImportExportEverywhere: true,
//         plugins: [
//             'typescript'
//         ]
//     })
//     fs.writeFileSync(p.join(__dirname, './ast.json'), JSON.stringify(ast))

//     const visitor = {
//         ImportDeclaration: (path, state) => {
//             const {
//                 node: {
//                     source: { value },
//                     specifiers
//                 }
//             } = path
//             if(value !== '@/remote') return
//             specifiers.forEach(specify => {
//                 const importedName = specify.imported.name
//                 const realModulePath = remoteModulePathMap[importedName]
//                 if(!realModulePath) return;
//                 path.insertBefore(types.importDeclaration([specify], types.stringLiteral(realModulePath.modulePath)))
//             })
//             path.remove()
//         }
//     }

//     traverse.default(ast, visitor)
//     console.log('before transform\n', code)
//     fs.writeFileSync('template-literal-ast.json', JSON.stringify(ast))
//     const result = generator.default(ast, {}, code)
//     console.log('after transform\n', result.code)
// }

module.exports = function ({ types, ...rest }) {
  console.log("import path replace plugin...");
  let remoteModulePathMap = {};
  function ImportDeclarationVisitor(path, { opts }) {
    console.log("ImportDeclarationVisitor....");
    const {
      node: {
        source: { value },
        specifiers,
      },
    } = path;
    debugger;
    if (value !== opts.match) return;
    console.log("ImportDeclarationVisitor....");
    // export { default as LZC } from 'appShell/lzc';
    // export { dynamic } from 'appShell/dynamic';
    // export { default as SLPageLoad, type TS_TYPE } from 'appShell/SLPageLoad';
    // export { useModel, history as My_History } from 'appShell/core';
    // 使用的地方：
    // import home from  './index.jsx'

    // import { dynamic as MyDynamic, LZC, useModel, My_History, SLPageLoad, type TS_TYPE } from '@/remote';
    // import { LZC as NN_LZC } from '@/remote';

    specifiers.forEach((specify) => {
      const importedName = specify.imported.name;
      const realModulePath = remoteModulePathMap[importedName];
      if (!realModulePath) return;
      const realModuleSpecify = realModulePath.specify;
      if (realModuleSpecify.local) {
        if (realModuleSpecify.local.name === 'default') {
          specify = types.importDefaultSpecifier(specify.local);
        } else {
          specify.imported = realModuleSpecify.local
        }
      }
      path.insertBefore(
        types.importDeclaration(
          [specify],
          types.stringLiteral(realModulePath.modulePath)
        )
      );
    });
    path.remove();
  }
  return {
    visitor: {
      Program: {
        enter(path, { opts = {} }) {
          const remoteFile = opts.remoteFile;
          const code = fs.readFileSync(
            p.resolve(__dirname, "../", remoteFile),
            "utf-8"
          );
          remoteModulePathMap = getRemoteModulePathMap(code);
        },
      },
      VariableDeclarator(path) {
        const node = path.node
        if (node.init.value === 'javascript') {
          node.init = types.stringLiteral('typescpirt11');


        }
        debugger;
      },
      Identifier(path) {
        const name = path.node.name;
        if (name === 'JavaScript') {
          // reverse the name: JavaScript -> tpircSavaJ
          path.node.name = name
            .split("")
            .reverse()
            .join("");
        }
      },
      ImportDeclaration: ImportDeclarationVisitor,
    },
  };
};
