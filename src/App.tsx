import './App.css'
import FlashMessageComponent from "./components/flash/FlashMessageComponent.tsx";
import {Outlet} from "react-router-dom";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";

function App() {
  return (
    <>
        <Header/>
        <FlashMessageComponent/>
        <Outlet />
        <Footer/>
    </>
  )
}

export default App
