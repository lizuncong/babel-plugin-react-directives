const fs = require('fs')

module.exports = function ({ types }) {
  return {
    visitor: {
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
          let alterValue = displayProperty ? displayProperty.value : types.stringLiteral('')
          const conditionalExpression = types.conditionalExpression(rTest, alterValue, types.stringLiteral('none'))
          if(displayProperty){
            displayProperty.value = conditionalExpression
          } else {
            const objectProperty = types.objectProperty(types.identifier('display'), conditionalExpression)
            propertys.push(objectProperty)
          }
        }

      }
    }
  }
}
