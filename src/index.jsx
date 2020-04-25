
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
