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
      <div r-if={b}>
        <B r-if={b} />
      </div>
  )
}


const F = () => {
  console.log('this...', this.A)
}



//转换后：
const b = 'c';

const B = () => {
  return <span>
      I am Big B
    </span>;
};

const A = () => {
  return b ? <div>
        {b ? <B /> : null}
      </div> : null;
};

const F = () => {
  console.log('this...', this.A);
};