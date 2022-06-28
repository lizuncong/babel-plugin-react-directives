const generator = require('@babel/generator')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const types = require('@babel/types')
const fs = require('fs')
const p = require('path')

// 根据文件导出的模块，生成对应的模块名与路径映射，比如：
// export { dynamic } from 'appShell/dynamic';
// export { default as SLPageLoad, type TS_TYPE } from 'appShell/SLPageLoad';
// 会生成下面的映射：
// {
//     dynamic: {
//         name: 'dynamic', 
//         exportKind: 'value',
//         modulePath: 'appShell/dynamic'
//     },
//     SLPageLoad: {
//         name: 'SLPageLoad',
//         exportKind: 'value',
//         modulePath: 'appShell/SLPageLoad'
//     },
//     TS_TYPE: {
//         name: 'TS_TYPE',
//         exportKind: 'type',
//         modulePath: 'appShell/SLPageLoad'
//     }
// }

module.exports = function getRemoteModulePathMap(code) {
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
            const {
                node: {
                    source = {},
                    specifiers
                }
            } = path
            const modulePath = source.value
            specifiers.forEach(specify => {
                const {
                    exported,
                    exportKind
                } = specify
                remoteModulePathMap[exported.name] = {
                    name: exported.name, // 导出的模块名称
                    exportKind, // 值：type或者value。正常的模块是value。typescript的类型声明是type
                    modulePath // 模块路径
                }
            })
        }
    }

    traverse.default(ast, visitor)
    return remoteModulePathMap
}