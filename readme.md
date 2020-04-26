这是一个babel插件，用于给react添加r-show，r-if指令，使得react可以像vue一样使用
r-if，r-show做条件渲染。
其中<div r-if={b}>test</div>。转换为{b ? <div>test</div> : ''}
<div r-show={b}>test</div>转换为<div style={{ display: b ? '' : 'none'}}>test</div>
目前r-if支持html标签及react组件
r-show只支持html标签，还不支持react组件，即不支持const B = () => return <div>B</div>. 
const A = () => { return <B r-show={b}/>}
关于组件的r-show问题，目前看来实现还比较复杂，相对简单的一种做法，如果是组件上的r-show，可以走r-if那套逻辑

demo目录用于测试的。其中index.js包含插件源码。source.jsx包含测试用的源代码。result.jsx输出转换后的代码。ast.json是
源代码转换后的代码。
demo/index.js
首先使用@babel/parser读取source.jsx源代码并转换为抽象语法树，即AST。
其次再使用@babel/traverse遍历抽象语法树，并根据visitor修改语法树。
最后使用@babel/generator将修改后的抽象语法树转为源代码。并输出到result.jsx文件中。
