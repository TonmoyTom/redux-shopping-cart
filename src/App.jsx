import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavbarCustom from "./components/NavbarCustom";
import CartDetails from "./components/CartDetails";
function App() {
  return (
    <>
     <NavbarCustom/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<CartDetails />} />
      </Routes>
    </>
  )
}

export default App
