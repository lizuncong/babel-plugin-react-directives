const generator = require('@babel/generator')

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
                }
            ],
        },
    }
    return generator.default(ast, {})

}


const resultObj = compile()

console.log('根据ast生成的源码：\n', resultObj.code)