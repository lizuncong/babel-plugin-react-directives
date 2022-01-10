import React from "react"

//转换前：

const showA = true;
const showB = false;
const A = () => {
  return (
      <div>
        Babel React Plugin
        <div r-if={showA}>show: A</div> 
        <div r-show={showB}>show: B</div>
      </div>
  )
}


//转换后：
const showA = true;
const showB = false;

const A = () => {
  return <div>
        Babel React Plugin
        {showA ? <div>show: A</div> : null} 
        <div style={{
      display: showB ? "" : "none"
    }}>show: B</div>
      </div>;
};