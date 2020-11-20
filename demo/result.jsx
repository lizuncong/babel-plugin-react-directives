import React from "react"

//转换前：

const b = 'c'

const B = (args) => {
  return (
    <span>
      I am Big B
    </span>
  )
}

const A = () => {
  return (
      <div style={{ display: 'inlne-block' }} r-show={b}>
        <B r-show={b} />
      </div>
  )
}


const F = () => {
  console.log('this...', this.A)
}


const p = new Promise(resolve => {resolve(1)})

p.then(res => console.log(res))



//转换后：
const b = 'c';

const B = args => {
  return <span>
      I am Big B
    </span>;
};

const A = () => {
  return <div style={{
    display: b ? 'inlne-block' : "none"
  }}>
        <B style={{
      display: b ? "" : "none"
    }} />
      </div>;
};

const F = () => {
  console.log('this...', this.A);
};

const p = new Promise(resolve => {
  resolve(1);
});
p.then(res => console.log(res));