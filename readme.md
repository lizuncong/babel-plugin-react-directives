### 目录介绍
- demo目录用于测试的。其中index.js包含插件源码。source.jsx包含测试用的源代码。result.jsx输出转换后的代码。ast.json是
源代码转换后的代码。
demo/index.js
首先使用@babel/parser读取source.jsx源代码并转换为抽象语法树，即AST。
其次再使用@babel/traverse遍历抽象语法树，并根据visitor修改语法树。
最后使用@babel/generator将修改后的抽象语法树转为源代码。并输出到result.jsx文件中。

### react指令插件开发
基于 babel 插件开发react指令。给react添加 r-if，r-show指令，功能与vue的v-if，v-show指令类似。

### r-if指令
r-if指令的开发是最简单的，能够支持 html标签、react组件。
```jsx
<div r-if={b}>test</div>
// 经过babel-plugin-react-directives插件编译会被转换为：
{b ? <div>test</div> : ''}
```

### r-show指令
```jsx
<div r-show={b}>test</div>
// 经过babel-plugin-react-directives插件编译会被转换为：
<div style={{ display: b ? '' : 'none'}}>test</div>
```
r-show只支持html标签，还不支持react组件，即不支持以下写法：
```jsx
const B = () => return <div>B</div>. 
const A = () => { return <B r-show={b}/>}
```
关于组件的r-show问题，目前看来实现还比较复杂，相对简单的一种做法，如果是组件上的r-show，可以走r-if那套逻辑
