const generator = require('@babel/generator')
const types = require('@babel/types')

function compile() {
    const ast = {
        "type": "File",
        "program": {
            "type": "Program",
            "sourceType": "module",
            "interpreter": null,
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "init": {
                                "type": "NumericLiteral",
                                "value": 1
                            }
                        },
                    ],
                    "kind": "const"
                },
            ],
        },
    }
    return generator.default(ast, {})

}


// const resultObj = compile()

// console.log('根据ast生成的源码：\n', resultObj.code)














const i = types.identifier('b')
const n = types.numericLiteral(3);
const v = types.variableDeclarator(i, n);


console.log('i...', i)
console.log('n...', n)
console.log('v...', v)