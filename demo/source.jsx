
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
