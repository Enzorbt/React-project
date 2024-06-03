import React from "react";
import SearchBar from "./SearchBar.tsx";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {

    return(
        <>
            HEADER
            <SearchBar/>
        </>
    )
};

export default Header;