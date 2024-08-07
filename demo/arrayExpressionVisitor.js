const types = require('@babel/types');

module.exports = (path, state) => {
    const {
        node
    } = path;
    const calleeName = node.callee?.name;
    if (calleeName !== 'classnames') return;
    const args = [];
    node.arguments.forEach(arg => {
        if (arg.type === 'ArrayExpression' && arg.elements) {
            const elements = [];
            arg.elements.forEach(el => {
                if (el.type === 'StringLiteral') {
                    const object = types.identifier(path.opts.__lessModuleName)
                    const property = types.identifier(el.value)
                    const memberExpression = types.memberExpression(object, property);
                    elements.push(memberExpression)
                } else {
                    elements.push(arg)
                }
            })

            args.push(types.arrayExpression(elements))
        } else if (arg.type === 'StringLiteral') {
            const object = types.identifier(path.opts.__lessModuleName)
            const property = types.identifier(arg.value)
            const memberExpression = types.memberExpression(object, property);
            args.push(memberExpression)
        } else {
            args.push(arg)
        }
    })
    node.arguments = args;
}
