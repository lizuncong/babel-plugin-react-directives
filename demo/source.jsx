
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
        <B r-if={b} />
      </div>
  )
}


