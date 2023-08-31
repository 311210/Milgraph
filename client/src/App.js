import React from "react"
import Navbar from "./Navbar"
import Converter from "./pages/Converter"
import Home from "./pages/Home"
import Visualization from "./pages/Visualization"
import What from "./pages/What"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/What" element={<What />} />
        </Routes>
      </div>
    </>
  )
}

export default App