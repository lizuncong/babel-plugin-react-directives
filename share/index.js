const generator = require('@babel/generator')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const types = require('@babel/types')
const fs = require('fs')
const p = require('path')

function compile() {
  const code = `
    import './GameRankListCard.less';
    export function GameRankListItem() {
      return (
        <div>
          123
        </div>
      );
    }
  `
  // 1.读取源代码并转换为抽象语法树
  const ast = parser.parse(code, {
    sourceType: "module",
    allowImportExportEverywhere: true,
    plugins: [
      'typescript',
      'jsx'
    ]
  })
  // 输出转换前的抽象语法树到ast.json
  fs.writeFileSync(p.join(__dirname, './ast.json'), JSON.stringify(ast))

  // 2.traverse
  const visitor = {
    Program: (path, state) => {
      const {
        node
      } = path;
      const moduleName = 'cls'
      const local = types.identifier(moduleName)
      const specify = types.importDefaultSpecifier(local);
      const clsImport = types.importDeclaration([specify], types.stringLiteral('../../a.js'));
      node.body = [clsImport, ...node.body]
    }
  }

  // traverse转换代码
  traverse.default(ast, visitor)

  // 3.generator将AST转回成代码
  return generator.default(ast, {}, code)

}


const resultObj = compile()

console.log('转换后的源码：\n', resultObj.code)