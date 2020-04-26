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
    <div r-show={b}>
      <B r-show={b} />
    </div>
  )
}
