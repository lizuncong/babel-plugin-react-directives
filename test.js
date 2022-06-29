const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

function transform(code) {
    const ast = parser.parse(code, {
        sourceType: "module"
    });

    const visitor = {
        Identifier(path) {
            const name = path.node.name;
            if (name === "JavaScript") {
                // reverse the name: JavaScript -> tpircSavaJ
                path.node.name = name.split("").reverse().join("");
            }
        },
        ImportSpecifier(path) {
            debugger
            if (path.node.imported.name === 'util') {
                path.replaceWith(
                    types.importDefaultSpecifier(path.node.imported)
                );
            }
        }
    };

    traverse.default(ast, visitor);
    console.log("before transform\n", code);
    const result = generator.default(ast, {}, code);
    console.log("after transform\n", result.code);
}

const code = `import { util } from "./util.js";`

transform(code)