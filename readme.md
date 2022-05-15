### 目录介绍
- demo目录用于学习 babel 编译过程的。在终端运行 node demo/index.js即可看到编译后的效果
  + index.js主要用于学习 `babel` 编译的整体流程，读取 source.jsx 的源码并编译
  + source.jsx是用于编写测试用例的地方

- src是我们的源码目录
- lib。babel编译后输出的目录。执行 `npm run build` 后，babel 会将我们的源码转换后输出到这个目录中
- react-directives-plugin.js。是 babel 插件，监听 `JSXElement` 节点类型，并调用我们的 visitor.js 
- visitor.js。这里是在编译阶段转换 react 中 r-if，r-show 属性
- .babelrc 是 babel 配置文件

### 运行
- 直接运行 `npm run build` 即可。

在本地开发时，建议在 demo 目录下测试，直接运行 `node demo/index.js`，然后观察源码对应的 ast 长什么样，再思考如何转换 r-if、r-show

### babel编译流程高度概括
- 首先使用 @babel/parser 读取源代码并转换为抽象语法树，即AST。
- 其次再使用 @babel/traverse 遍历抽象语法树，并根据 visitor 修改语法树。
- 最后使用 @babel/generator 将修改后的抽象语法树转为源代码。
- @babel/types 是 babel 提供给我们的修改 ast 抽象语法树的工具，可以类比 jquery。

babel 通过 访问者模式(visitor) 暴露接口给我们监听指定的节点类型，当 @babel/traverse 遍历我们的 ast 时，会调用我们在 visitor 中注册的插件。因此我们修改 ast 的逻辑主要在 visitor 暴露的插件接口中。


### react指令插件开发
基于 babel 插件开发react指令。给react添加 r-if，r-show指令，功能与vue的v-if，v-show指令类似。react 指令插件逻辑在[这里](https://github.com/lizuncong/babel-plugin-react-directives/blob/master/visitor.js)。在 **编译阶段** 将 react dom上的 r-if，r-show 属性转换成条件表达式等。

### r-if指令
r-if指令的开发是最简单的，能够支持 html标签、react组件。将 dom 上的 r-if 属性转换成三元表达式
```jsx
<div r-if={b}>test</div>
// 经过babel-plugin-react-directives插件编译会被转换为：
{b ? <div>test</div> : ''}
```

### r-show指令
如果 dom 上有 r-show 属性，那么给 dom 增加一个 style 属性
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

### 参考链接
- [babel types](https://babeljs.io/docs/en/babel-types)
- [babel 手册](https://github.com/jamiebuilds/babel-handbook)
- [babel插件开发手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
