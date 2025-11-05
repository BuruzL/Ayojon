import { Routes, Route, Navigate } from "react-router-dom"

import Home from "./pages/Home.jsx"
import Welcome from "./pages/Welcome.jsx"
import Auth from "./pages/Auth.jsx"
import BusinessDetail from "./pages/BusinessDetails.jsx" // make sure filename matches

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth/:role" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/business/:id" element={<BusinessDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
