import React from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('MetMuseumWelcome.webp')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="flex items-center text-white">
                    <h1 className="text-6xl font-bold mr-4">Welcome to The Met</h1>
                    <img src="/MMIcon.png" alt="The Met Logo" className="w-28 h-28" />
                </div>
            </div>
        </header>
    );
};

export default Header;
