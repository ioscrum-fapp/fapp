import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css'
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Placeholder from "./pages/Placeholder";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/statistics" element={<Stats></Stats>}></Route>
          <Route path="/placeholder" element={<Placeholder></Placeholder>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
