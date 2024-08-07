

const importVisitor = require('./importVisitor')
const JSXAttributeVisitor = require('./JSXAttributeVisitor')
const callExpressionVisitor = require('./CallExpressionVisitor')
const arrayExpressionVisitor = require('./arrayExpressionVisitor')

module.exports = function ({ types, ...rest }) {

    return {
        visitor: {
            JSXAttribute: JSXAttributeVisitor,
            ImportDeclaration: importVisitor,
            CallExpression: callExpressionVisitor,
            ArrayExpression: arrayExpressionVisitor
        },
    };
};
