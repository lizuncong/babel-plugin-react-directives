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

const show = async () => {
  const result = await new Promise(resolve => resolve(1))
  console.log(result)
}
