import React from "react";
import SearchBar from "../search/SearchBar.tsx";
import NavBar from "./NavBar.tsx";
import {Link} from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header>
            <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('MetMuseumWelcome.webp')"}}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center text-white">
                        <h1 className="text-6xl font-bold mr-4">Welcome to The Met</h1>
                        <Link to={"/"}>
                            <img src="/MMIcon.png" alt="The Met Logo"
                                 className="w-28 h-28"/>
                        </Link>
                    </div>
                </div>
            </div>
            <SearchBar/>
            <NavBar/>
        </header>
    );
};

export default Header;