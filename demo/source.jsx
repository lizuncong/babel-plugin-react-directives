//
// const b = 'c'
//
// const B = (args) => {
//   return (
//     <span>
//       I am Big B
//     </span>
//   )
// }
//
// const A = () => {
//   return (
//       <div style={{ display: 'inlne-block' }} r-show={b}>
//         <B r-show={b} />
//       </div>
//   )
// }


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