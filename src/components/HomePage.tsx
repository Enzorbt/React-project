import SearchModel from "../models/SearchModel.tsx";
import React from "react";
import SearchBar from "./SearchBar.tsx";
import Carrousel from "./Carrousel.tsx";


interface HomePageProps {
    searchModel: SearchModel;
}

const HomePage: React.FC<HomePageProps> = ({ searchModel }) => {
    
    return(
        <>
            <SearchBar/>
            <Carrousel searchModel={searchModel}/>

        </>
    )
};

export default HomePage;