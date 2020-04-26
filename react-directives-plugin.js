const fs = require('fs')
const jsxElementVisitor = require('./visitor')

module.exports = function ({ types }) {
  return {
    visitor: {
      JSXElement: jsxElementVisitor(types)
    }
  }
}
