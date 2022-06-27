const generator = require('@babel/generator')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const types = require('@babel/types')
const fs = require('fs')
const p = require('path')

module.exports = function getRemoteModulePathMap(remoteFilePath) {
    const code = fs.readFileSync(p.join(__dirname, './remote.js'), 'utf-8')
    const remoteModulePathMap = {}
    const ast = parser.parse(code, {
        sourceType: "module",
        allowImportExportEverywhere: true,
        plugins: [
            'typescript'
        ]
    })
    const visitor = {
        ExportNamedDeclaration: (path, state) => {
            const { node: { source, specifiers } } = path
            const modulePath = source.value
            specifiers.forEach(specify => {
                const { exported, exportKind } = specify
                remoteModulePathMap[exported.name] = {
                    name: exported.name,
                    exportKind
                }
            })
        }
    }

    traverse.default(ast, visitor)
    return remoteModulePathMap
}
