import SearchModel from "../models/SearchModel.tsx";
import React from "react";
import Carrousel from "./Carrousel.tsx";

interface HomePageProps {
    searchModel: SearchModel;
}

const HomePage: React.FC<HomePageProps> = ({ searchModel }) => {
    
    return(
        <>
            <Carrousel searchModel={searchModel}/>
        </>
    )
};

export default HomePage;