import React from 'react'
const b = 'c'
const B = () => {
  return (
    <div>
      I am Big B
    </div>
  )
}
const A = () => {
  return (
      <div r-if={b}>
        <div r-show={b}>
          <B r-show={b} />
        </div>
      </div>
  )
}



const F = function(){
  console.log('this...Outer..', this);
  const f = ( ) => {
    console.log('this...inner..', this);
  }
  return f;
}
