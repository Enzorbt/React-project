import SearchModel from "../models/SearchModel.tsx";
import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";
import Carrousel from "./Carrousel.tsx";
import ObjectType from "../types/ObjectType.tsx";
import {useFlashes} from "../providers/FlashesProvider.tsx";


interface HomePageProps {
    searchModel: SearchModel;
}

const HomePage: React.FC<HomePageProps> = ({ searchModel }) => {
    const [highlights, setHighlights] = useState<ObjectType[]>([]);
    const { setFlashMessage } = useFlashes();

    useEffect(() => {
        searchModel
            .getCarrouselItems(
                {
                    q: null,
                    isHighlight: true,
                    isOnView: null,
                    artistOrCulture: null,
                    hasImages: true,
                    title: null,
                    tags: null,
                    departmentId: null,
                    medium: null,
                    geoLocation: null,
                    dateBegin: null,
                    dateEnd: null,
                }, 
                20
            )
            .then(setHighlights)
            .catch((error) => {
                console.error("Error fetching highlights", error);
                setFlashMessage({
                    message: "Error fetching highlights, " + error,
                    type: "error",
                });
            });
    }, [searchModel]);
    
    return(
        <>
            <SearchBar/>
            {/*Highlights carrousel*/}
            <Carrousel objects={highlights}/>

        </>
    )
};

export default HomePage;