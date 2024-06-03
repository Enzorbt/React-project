import React, { useEffect, useState } from "react";
import Highlight from "./Highlight";
import ObjectType from "../types/ObjectType.tsx";
import SearchModel from "../models/SearchModel.tsx";
import { useFlashes } from "../providers/FlashesProvider.tsx";
import ReactSlick from "react-slick";

interface HighlightsProps {
    searchModel: SearchModel;
}

const Highlights: React.FC<HighlightsProps> = ({ searchModel }) => {
    const [highlights, setHighlights] = useState<ObjectType[]>([]);
    const { setFlashMessage } = useFlashes();

    useEffect(() => {
        searchModel
            .getHighlights()
            .then(setHighlights)
            .catch((error) => {
                console.error("Error fetching highlights", error);
                setFlashMessage({
                    message: "Error fetching highlights, " + error,
                    type: "error",
                });
            });
    }, [searchModel]);

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props } : {currentSlide: number, slideCount: number}) => (
        <button
            {...props}
            className={
                "slick-prev slick-arrow" +
                (currentSlide === 0 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0}
            type="button"
        >
            <svg aria-hidden="true"
                 className="w-6 h-6 text-white transition duration-150 ease-in-out group-hover:text-gray-400"
                 fill="" // was "currentColor" but it turned white
                 viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">
                </path>
            </svg>
            <span className="sr-only">PREV</span>
        </button>
    );
    const SlickArrowRight = ({currentSlide, slideCount, ...props}: {
        currentSlide: number,
        slideCount: number
    }) => (
        <button
            {...props}
            className={
                "slick-next slick-arrow" +
                (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1}
            type="button">
            <svg aria-hidden="true"
                 className="w-6 h-6 text-white transition duration-150 ease-in-out group-hover:text-gray-400"
                 fill="" // was "currentColor" but it turned white
                 viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z">
                </path>
            </svg>
            <span className="sr-only">
                Next
            </span>
        </button>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: (
            <SlickArrowLeft currentSlide={0} slideCount={3}/>
        ),
        nextArrow: (
            <SlickArrowRight currentSlide={0} slideCount={3}/>
        ),
    };

    return (
        <div className="relative mt-8">
            <ReactSlick {...settings}>
                {highlights.slice(0, 20).map((highlight) => (
                    <div key={highlight.objectID} className="p-2">
                        <Highlight highlight={highlight}/>
                    </div>
                ))}
            </ReactSlick>
        </div>
    );
};

export default Highlights;
