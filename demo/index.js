const generator = require('@babel/generator')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const types = require('@babel/types')
const fs = require('fs')
const p = require('path')
const jsxElementVisitor = require('../visitor')

function compile(code) {
  // 1.读取源代码并转换为抽象语法树
  const ast = parser.parse(code, {
    plugins: [
      'jsx'
    ]
  })
  // 输出转换前的抽象语法树到ast.json
  fs.writeFileSync(p.join(__dirname, './ast.json'), JSON.stringify(ast))

  // 2.traverse
  const visitor = {
    JSXElement: jsxElementVisitor(types)
  }

  // traverse转换代码
  traverse.default(ast, visitor)
  // fs.writeFileSync('template-literal-ast.json', JSON.stringify(ast))

  // 3.generator将AST转回成代码
  return generator.default(ast, {}, code)

}


const code = fs.readFileSync(p.join(__dirname, './source.jsx'), 'utf-8')

const resultObj = compile(code)

const output = 'import React from "react"\n\n' + '//转换前：\n' + code + '\n\n\n' + '//转换后：\n' + resultObj.code

fs.writeFileSync(p.join(__dirname, './result.jsx'), output)
