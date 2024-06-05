import React from "react";
import CarrouselElement from "./CarrouselElement.tsx";
import ObjectType from "../../types/ObjectType.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarrouselProps {
    objects: ObjectType[];
}

const Carrousel: React.FC<CarrouselProps> = ({ objects }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props } : {currentSlide: number, slideCount: number}) => (
        <button
            {...props}
            className={
                "slick-prev slick-arrow" +
                (currentSlide === 0 ? " slick-disabled" : "") +
                " w-12 h-6 flex items-center justify-center bg-gray-800 text-white rounded-full transition duration-150 ease-in-out hover:bg-gray-600"
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0}
            type="button"
        >
            <svg aria-hidden="true"
                 className="w-8 h-4"
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
                " w-12 h-6 flex items-center justify-center bg-blue-800 text-white rounded-full transition duration-150 ease-in-out hover:bg-blue-600"
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1}
            type="button">
            <svg aria-hidden="true"
                 className="w-8 h-4"
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
        prevArrow: <SlickArrowLeft currentSlide={0} slideCount={objects.length} />,
        nextArrow: <SlickArrowRight currentSlide={0} slideCount={objects.length} />,
    };

    return (
        <div className="relative mt-10 max-w-7xl mx-auto p-4 bg-gray-900 rounded-lg shadow-red-950-lg">
            <Slider {...settings}>
                {objects.slice(0, 20).map((object) => (
                    <div key={object.objectID} className="p-2 relative z-10">
                        <div className="transition transform hover:scale-105 hover:shadow-2xl hover:z-20">
                            <CarrouselElement object={object}/>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carrousel;
