const generator = require('@babel/generator')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const types = require('@babel/types')
const fs = require('fs')
const p = require('path')

function replace() {
    const code = fs.readFileSync(p.join(__dirname, './home.js'), 'utf-8')
    const remoteModulePathMap = {}
    const ast = parser.parse(code, {
        sourceType: "module",
        allowImportExportEverywhere: true,
        plugins: [
            'typescript'
        ]
    })
    fs.writeFileSync(p.join(__dirname, './ast.json'), JSON.stringify(ast))

    const visitor = {
        ImportDeclaration: (path, state) => {
            debugger
        }
    }

    traverse.default(ast, visitor)
    return remoteModulePathMap
}

replace()