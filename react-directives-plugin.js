const fs = require('fs')

module.exports = function ({ types }) {
  return {
    visitor: {
      JSXElement(path, state){
        fs.writeFileSync('./lib/ast.json', JSON.stringify(path.node))
        if(path.node.operator !== '===') return
        path.node.left = t.identifier("custom")
        path.node.right = t.identifier("dork")
      }
    }
  }
}
