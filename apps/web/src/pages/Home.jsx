import { useEffect, useState } from "react"
import Header from "../components/Header.jsx"
import SearchBar from "../components/SearchBar.jsx"
import CategoryRibbon from "../components/CategoryRibbon.jsx"
import BusinessCard from "../components/BusinessCard.jsx"
import { getBusinesses } from "../services/api.js"

const quickChips = ["Coffee","Photography","Catering","Boutique","Food","Wedding"]

export default function Home() {
  const [q,setQ]=useState("")
  const [category,setCategory]=useState(null)
  const [items,setItems]=useState([])

  useEffect(()=>{
    let on=true
    getBusinesses({ q, category }).then(d=>on&&setItems(d))
    return ()=>{on=false}
  },[q,category])

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="container center">
          <div className="glass shadow" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:999,marginBottom:16,fontSize:12}}>
            <span style={{width:8,height:8,borderRadius:999,background:"var(--accent)",display:"inline-block"}}></span>
            Built for local Facebook businesses
          </div>

          <h1><span>AYO</span><span>JON</span></h1>
          <p style={{marginTop:12,color:"var(--muted)"}}>What do you want?</p>

          <div className="mt-6">
            <SearchBar onSearch={setQ}/>
          </div>

          <div className="mt-6" style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            {quickChips.map(c=>(
              <button key={c} className="btn-chip" onClick={()=>setQ(c)}>{c}</button>
            ))}
          </div>

          <p className="mt-10" style={{color:"var(--muted)"}}>Keep scrolling to explore</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="pt-4">
        <CategoryRibbon selectedCategory={category} onSelectCategory={setCategory}/>
      </section>

      {/* GRID */}
      <section className="container pb-24">
        <div className="grid cols-3">
          {items.map(b=> <BusinessCard key={b.id} business={b}/>)}
        </div>
        {!items.length && (
          <div className="glass" style={{borderRadius:18,padding:24,textAlign:"center",marginTop:24,color:"var(--muted)"}}>
            No results. Try another search or category.
          </div>
        )}
      </section>
    </>
  )
}
