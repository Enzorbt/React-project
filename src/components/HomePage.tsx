import SearchModel from "../models/SearchModel.tsx";
import React from "react";
import Highlights from "./Highlights.tsx";
import SearchBar from "./SearchBar.tsx";


interface HomePageProps {
    searchModel: SearchModel;
}

const HomePage: React.FC<HomePageProps> = ({ searchModel }) => {
    
    return(
        <>
            <SearchBar/>
            <Highlights searchModel={searchModel}/>
        </>
    )
};

export default HomePage;