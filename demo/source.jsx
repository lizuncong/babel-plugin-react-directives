
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
        <B r-show={b} />
      </div>
  )
}


const F = () => {
  console.log('this...', this.A)
}
