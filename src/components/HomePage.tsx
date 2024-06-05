import SearchModel from "../models/SearchModel.tsx";
import React, {useEffect, useState} from "react";
import Carrousel from "./Carrousel.tsx";
import ObjectType from "../types/ObjectType.tsx";
import {useFlashes} from "../providers/FlashesProvider.tsx";
import MetPresentations from "./MetPresentations.tsx";


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
                setFlashMessage({
                    message: "Error fetching highlights, " + error,
                    type: "error",
                });
            });
    }, [searchModel, setFlashMessage]);
    
    return(
        <>
            <link rel="icon" type="image/svg+xml" href="/MMIcon.png"/>
            <MetPresentations/>
            <div className="flex justify-center items-center">
                <hr className=" w-80 white m-6"/>
            </div>
            {/*Highlights carrousel*/}
            <div
                className="text-white text-2xl font-extrabold justify-items-start">
                <h2>
                    Hightlights :
                </h2>
            </div>
            <Carrousel objects={highlights}/>
        </>
    )
};

export default HomePage;