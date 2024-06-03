import './App.css'
import FlashMessageComponent from "./components/FlashMessageComponent.tsx";
import {Outlet} from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

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
