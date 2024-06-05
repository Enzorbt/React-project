import React from "react";
import SearchBar from "./SearchBar.tsx";
import NavBar from "./NavBar.tsx";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header>
            <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('MetMuseumWelcome.webp')"}}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center text-white">
                        <h1 className="text-6xl font-bold mr-4">Welcome to The Met</h1>
                        <img src="/MMIcon.png" alt="The Met Logo" className="w-28 h-28" />
                    </div>
                </div>
            </div>
            <SearchBar/>
            <NavBar/>
        </header>
    );
};

export default Header;