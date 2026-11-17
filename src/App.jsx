import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Sky } from "./sky/Sky"
import { NotFound } from "./pages/NotFound"
import { Toaster } from "./components/ui/toaster"
import { SITE } from "./siteVersion"


function App() {

  return (
    <>
      < Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={SITE === "classic" ? <Home /> : <Sky />} />
          <Route path="/sky" element={<Sky />} />
          <Route path="/classic" element={<Home />} />
          <Route path ="*" element={<NotFound />} />

        </Routes>
    
      </BrowserRouter>

      
    </>
  )
}

export default App
