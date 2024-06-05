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
    const [onView, setOnView] = useState<ObjectType[]>([]);
    const [frenchCulture, setFrenchCulture] = useState<ObjectType[]>([]);
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

        searchModel
            .getCarrouselItems(
                {
                    q: null,
                    isHighlight: null,
                    isOnView: true,
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
            .then(setOnView)
            .catch((error) => {
                setFlashMessage({
                    message: "Error fetching On Views, " + error,
                    type: "error",
                });
            });

        searchModel
            .getCarrouselItems(
                {
                    q: "french",
                    isHighlight: null,
                    isOnView: null,
                    artistOrCulture: true,
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
            .then(setFrenchCulture)
            .catch((error) => {
                setFlashMessage({
                    message: "Error fetching french culture items, " + error,
                    type: "error",
                });
            });
    }, [searchModel, setFlashMessage, setHighlights, setFrenchCulture, setOnView]);
    
    return(
        <>
            <link rel="icon" type="image/svg+xml" href="/MMIcon.png"/>
            <MetPresentations/>
            <div className="flex justify-center items-center">
                <hr className="w-80 white my-4"/>
            </div>
            {/*Highlights carrousel*/}
            <div
                className="text-white text-2xl font-extrabold justify-items-start">
                <h2>
                    Highlights :
                </h2>
            </div>
            <Carrousel objects={highlights}/>
            <div className="flex justify-center items-center">
                <hr className="w-80 white my-4"/>
            </div>
            {/*OnView carrousel*/}
            <div
                className="text-white text-2xl font-extrabold justify-items-start">
                <h2>
                    On View :
                </h2>
            </div>
            <Carrousel objects={onView}/>
            <div className="flex justify-center items-center">
                <hr className="w-80 white my-4"/>
            </div>
            {/*French Culture carrousel*/}
            <div
                className="text-white text-2xl font-extrabold justify-items-start">
                <h2>
                    French Culture :
                </h2>
            </div>
            <Carrousel objects={frenchCulture}/>
        </>
    )
};

export default HomePage;