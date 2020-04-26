import React from "react"

//转换前：

const b = 'c'

const B = () => {
  return (
    <span>
      I am Big B
    </span>
  )
}

const A = () => {
  return (
      <div r-show={b}>
        <B r-show={b} />
      </div>
  )
}





//转换后：
const b = 'c';

const B = () => {
  return <span>
      I am Big B
    </span>;
};

const A = () => {
  return <div style={{
    display: b ? "" : "none"
  }}>
        <B style={{
      display: b ? "" : "none"
    }} />
      </div>;
};