import React, { useEffect, useState } from "react";
import CarrouselElement from "./CarrouselElement.tsx";
import ObjectType from "../types/ObjectType";
import SearchModel from "../models/SearchModel";
import { useFlashes } from "../providers/FlashesProvider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HighlightsProps {
    searchModel: SearchModel;
}

const Carrousel: React.FC<HighlightsProps> = ({ searchModel }) => {
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
                (currentSlide === 0 ? " slick-disabled" : "") +
                " w-12 h-12 flex items-center justify-center bg-gray-800 text-white rounded-full transition duration-150 ease-in-out hover:bg-gray-600"
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0}
            type="button"
        >
            <svg aria-hidden="true"
                 className="w-8 h-8"
                 fill="currentColor"
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
                (currentSlide === slideCount - 1 ? " slick-disabled" : "") +
                " w-12 h-12 flex items-center justify-center bg-gray-800 text-white rounded-full transition duration-150 ease-in-out hover:bg-gray-600"
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1}
            type="button">
            <svg aria-hidden="true"
                 className="w-8 h-8"
                 fill="currentColor"
                 viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z">
                </path>
            </svg>
            <span className="sr-only">Next</span>
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
        prevArrow: <SlickArrowLeft currentSlide={0} slideCount={highlights.length} />,
        nextArrow: <SlickArrowRight currentSlide={0} slideCount={highlights.length} />,
    };

    return (
        <div className="relative mt-8 max-w-7xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
            <Slider {...settings}>
                {highlights.slice(0, 20).map((highlight) => (
                    <div key={highlight.objectID} className="p-2 relative z-10">
                        <div className="transition transform hover:scale-105 hover:shadow-2xl hover:z-20">
                            <CarrouselElement highlight={highlight}/>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carrousel;
