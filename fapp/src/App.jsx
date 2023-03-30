import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Placeholder from "./pages/Placeholder";
import Stats from "./pages/Stats";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/statistics" element={<Stats />} />
          <Route path="/placeholder" element={<Placeholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
