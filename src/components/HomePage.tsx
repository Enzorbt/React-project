import SearchModel from "../models/SearchModel.tsx";
import React from "react";
import Highlights from "./Highlights.tsx";

interface HomePageProps {
    searchModel: SearchModel;
}

const HomePage: React.FC<HomePageProps> = ({ searchModel }) => {
    
    return(
        <>
            <Highlights searchModel={searchModel}/>
        </>
    )
};

export default HomePage;