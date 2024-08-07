const types = require('@babel/types');

module.exports = (path, state) => {
    const {
        node
    } = path;
    const calleeName = node.callee?.name;
    if (calleeName !== path.opts.__classnamesStr) return;
    const args = [];
    node.arguments.forEach(arg => {
        if (arg.type === 'ArrayExpression' && arg.elements) {
            const elements = [];
            arg.elements.forEach(el => {
                if (el.type === 'StringLiteral') {
                    const object = types.identifier(path.opts.__lessModuleName)
                    const isComputed = el.value.includes('-')
                    const property = isComputed ? types.stringLiteral(el.value) : types.identifier(el.value)
                    const memberExpression = types.memberExpression(object, property, isComputed);
                    elements.push(memberExpression)
                } else {
                    elements.push(arg)
                }
            })

            args.push(types.arrayExpression(elements))
        } else if (arg.type === 'StringLiteral') {
            const object = types.identifier(path.opts.__lessModuleName)
            const property = types.identifier(arg.value)
            const isComputed = arg.value.includes('-')
            const memberExpression = types.memberExpression(object, property, isComputed);
            args.push(memberExpression)
        } else {
            args.push(arg)
        }
    })
    node.arguments = args;
}
