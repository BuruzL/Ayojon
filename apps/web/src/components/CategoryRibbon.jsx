import { useRef, useState } from "react"

const categories = ["Food","Photography","Shopping","Catering","Clothing","Entertainment"]

export default function CategoryRibbon({ selectedCategory, onSelectCategory }) {
  const ref = useRef(null)
  const [canL,setL]=useState(false), [canR,setR]=useState(true)

  const onScroll=()=>{
    if(!ref.current) return
    const {scrollLeft,scrollWidth,clientWidth}=ref.current
    setL(scrollLeft>0); setR(scrollLeft < scrollWidth-clientWidth-8)
  }
  const scroll=(d)=> ref.current?.scrollBy({left:d==="left"?-300:300, behavior:"smooth"})

  return (
    <div className="container" style={{position:"relative"}}>
      {canL && <button className="btn" style={{position:"absolute",left:-8,top:"50%",transform:"translateY(-50%)"}} onClick={()=>scroll("left")}>‹</button>}
      <div ref={ref} className="ribbon" onScroll={onScroll}>
        <button className={`btn-chip ${!selectedCategory ? "active":""}`} onClick={()=>onSelectCategory(null)}>All</button>
        {categories.map(c=>(
          <button key={c} className={`btn-chip ${selectedCategory===c?"active":""}`} onClick={()=>onSelectCategory(c)}>{c}</button>
        ))}
      </div>
      {canR && <button className="btn" style={{position:"absolute",right:-8,top:"50%",transform:"translateY(-50%)"}} onClick={()=>scroll("right")}>›</button>}
    </div>
  )
}
