const generator = require('@babel/generator')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const types = require('@babel/types')
const fs = require('fs')
const p = require('path')


function compile(code) {
  // 1.parse
  const ast = parser.parse(code, {
    plugins: [
      'jsx'
    ]
  })
  // 输出转换前的抽象语法树到ast.json
  fs.writeFileSync(p.join(__dirname, './ast.json'), JSON.stringify(ast))

  // 2.traverse
  const visitor = {
    JSXElement(path, state){
      const { node: jsxNode } = path
      const jsxAttributes = jsxNode.openingElement.attributes
      // 如果没有attributes属性或者attributes长度为0，则不进行转换
      if(!jsxAttributes || !jsxAttributes.length) return
      const index = jsxAttributes.findIndex(item => ['r-if', 'r-show'].indexOf(item.name.name) > -1 )

      const findAttr = jsxAttributes[index]

      // 如果没有r-if或者r-show属性，则不处理。或者属性没有值，也不处理
      if(!findAttr || findAttr.value === null) return

      // 移除r-if或者r-show属性
      jsxAttributes.splice(index, 1)

      const rTest = findAttr.value.expression

      if(findAttr.name.name === 'r-if'){
        const nullLiteral = types.nullLiteral()
        const conditionalExpression = types.conditionalExpression(rTest, jsxNode, nullLiteral)
        const jsxExpressionContainer = types.jsxExpressionContainer(conditionalExpression)
        if(types.isReturnStatement(path.parentPath.node)){
          path.replaceWith(conditionalExpression)
        } else {
          path.replaceWith(jsxExpressionContainer)
        }
      } else if(findAttr.name.name === 'r-show'){
        let styleAttr = jsxAttributes.find(item => item.name.name === 'style')
        if(!styleAttr){
          const ObjectExpression = types.objectExpression([])
          styleAttr = types.jsxAttribute(types.jsxIdentifier('style'), types.jsxExpressionContainer(ObjectExpression))
          jsxAttributes.push(styleAttr)
        }

        const propertys = styleAttr.value.expression.properties
        const displayProperty = propertys.find(item => item.key.name === 'display')
        let alterValue = types.stringLiteral('')
        if(displayProperty){
          alterValue = displayProperty.value
          const conditionalExpression = types.conditionalExpression(rTest, types.stringLiteral('none'), alterValue)
          displayProperty.value = conditionalExpression
        } else {
          const conditionalExpression = types.conditionalExpression(rTest, types.stringLiteral('none'), alterValue)
          const objectProperty = types.objectProperty(types.identifier('display'), conditionalExpression)

          propertys.push(objectProperty)
        }
      }

    }
  }

  // traverse转换代码
  traverse.default(ast, visitor)
  // fs.writeFileSync('template-literal-ast.json', JSON.stringify(ast))

  // 3.generator将AST转回成代码
  return generator.default(ast, {}, code)

}


const code = fs.readFileSync(p.join(__dirname, './source.jsx'), 'utf-8')

const resultObj = compile(code)
console.log(resultObj)

fs.writeFileSync(p.join(__dirname, './result.jsx'), 'import React from "react"\n' + resultObj.code)
