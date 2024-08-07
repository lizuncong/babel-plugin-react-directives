const types = require('@babel/types')

module.exports = (path, state) => {
  const {
    node
  } = path;
  // 处理className或者classNames属性
  if (['className', 'classNames'].includes(node.name.name)) {
    processClassName(path, state);
    return;
  }

  // 注释掉data-属性
  if (node.name.name.startsWith('data-')) {
    commentOutDataAttribute(path, state)
  }


}
const commentOutDataAttribute = (path, state) => {
  const { node } = path;
  path.addComment('leading', `${node.name.name}=${node.value.value}`, true);
  // path.replaceWith(
  //   types.CommentLine('fdafdsafd')
  // );
  path.remove();
}
const processClassName = (path, state) => {
  const {
    node
  } = path;
  // 先处理这种情况：<span className='btn btn_primary'></span>
  if (node.value.type === 'StringLiteral') {
    const values = node.value.value.split(' ').filter(i => i);
    if (values.length > 1) {
      const args = [];
      values.forEach(v => {
        const object = types.identifier(path.opts.__lessModuleName)
        const isComputed = v.includes('-')
        const property = isComputed ? types.stringLiteral(v) : types.identifier(v)

        const memberExpression = types.memberExpression(object, property, isComputed);
        
        args.push(memberExpression)
      })
      const callee = types.identifier(path.opts.__classnamesStr)
      const callExpression = types.callExpression(callee, args);

      node.value = types.jsxExpressionContainer(callExpression);


    } else {
      const object = types.identifier(path.opts.__lessModuleName)
      const isComputed = node.value.value.includes('-')
      const property = isComputed ? types.stringLiteral(node.value.value) : types.identifier(node.value.value)
      const memberExpression = types.memberExpression(object, property, isComputed);
      node.value = types.jsxExpressionContainer(memberExpression);
    }


  }


}