const types = require('@babel/types');

module.exports = (path, state) => {
    const {
        node
    } = path;
    const attributeNode = path.findParent((path) => path.isJSXAttribute())?.node;
    if (!attributeNode) return;
    const isClassNames = ['className', 'classNames'].includes(attributeNode.name.name)
    if (!isClassNames) { return }
    node.elements.forEach((el, idx) => {
        if (el.type === 'Identifier') {
            // const object = types.identifier(path.opts.__lessModuleName)
            // const property = types.identifier(el.name)
            // const memberExpression = types.memberExpression(object, property);
            // elements.push(el)
        } if (el.type === 'StringLiteral') {
            const object = types.identifier(path.opts.__lessModuleName)
            const isComputed = el.value.includes('-')
            const property = isComputed ? types.stringLiteral(el.value) : types.identifier(el.value)
            const memberExpression = types.memberExpression(object, property, isComputed);
            node.elements[idx] = memberExpression;
        } else {
            // elements.push(el)
        }
    })


}
