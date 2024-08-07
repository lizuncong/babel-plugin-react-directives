const types = require('@babel/types')

module.exports = (path, state) => {
  const {
    node
  } = path;
  // 只处理className或者classNames属性
  if (!['className', 'classNames'].includes(node.name.name)) return;

  processClassName(path, state);


}

const processClassName = (path, state) => {
  const {
    node
  } = path;
  // 先处理这种情况：<span className='btn btn_primary'></span>
  if (node.value.type === 'StringLiteral') {
    const values = node.value.value.split(' ').filter(i => i);
    if(values.length > 1){
      const args = [];
      values.forEach(v => {
        const object = types.identifier(path.opts.__lessModuleName)
        const property = types.identifier(v)
        const memberExpression = types.memberExpression(object, property);
        args.push(memberExpression)
      })
      const callee = types.identifier('classnames')
      const callExpression = types.callExpression(callee, args);

      node.value = types.jsxExpressionContainer(callExpression);


    } else {
      const object = types.identifier(path.opts.__lessModuleName)
      const property = types.identifier(node.value.value)
      const memberExpression = types.memberExpression(object, property);
      node.value = types.jsxExpressionContainer(memberExpression);
    }
   

  }


}