import React from "react"

//转换前：

const b = 'c'
const a = () => {
  return (
      <div r-show={b} style={{ display: 'flex' }}>
        this is div
        <span r-if={b}>
          this is span
        </span>
      </div>
  )
}



//转换后：
const b = 'c';

const a = () => {
  return <div style={{
    display: b ? "none" : 'flex'
  }}>
        this is div
        {b ? <span>
          this is span
        </span> : null}
      </div>;
};