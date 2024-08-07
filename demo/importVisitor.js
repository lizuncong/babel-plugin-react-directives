const types = require('@babel/types')

module.exports = (path, state) => {
  const {
    node: {
      source: { value },
      specifiers,
    },
  } = path;
  const parts = value.split('.');
  const ext = parts[parts.length - 1]
  if (ext === 'less') {
    // 取文件名
    const moduleName = parts[parts.length - 2].replace('/', '')
    const local = types.identifier(moduleName)
    path.opts.__lessModuleName = moduleName;
    specify = types.importDefaultSpecifier(local);
    specifiers.push(specify)
  }


}
