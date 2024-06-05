import React from 'react';
import PresentationType from "../types/PresentationType.tsx";
import MetPresentation from "./MetPresentation.tsx";

const MetPresentations: React.FC = () => {
    const presentations: PresentationType[] = [
        {
            index: 0,
            title: "Garden Festival at The Met Cloisters",
            description: "On Saturday, June 8, enjoy performances, art making, garden tours, and more.",
            imageUrl: "/garden.jpeg"
        },
        {
            index: 1,
            title: "Exhibition of Modern Art",
            description: "Explore the modern art collection featuring artists from the 20th and 21st centuries.",
            imageUrl: "/modernArtExpo.webp"
        },
        {
            index: 2,
            title: "Pride Month",
            description: "Celebrate the remarkable contributions of the LGBTQIA+ community through special programs and digital content.",
            imageUrl: "/pride.png"
        },
        {
            index: 3,
            title: "Timeless Jewelry",
            description: "Discover new and best-selling designs inspired by 5,000 years of art.",
            imageUrl: "/jewelry.webp"
        }
    ];

    return (
        <div className="container mx-auto p-4">
            {presentations.map((item : PresentationType) => (
                <MetPresentation
                    key={item.index}
                    item={item}
                />
            ))}
        </div>
    );
};

export default MetPresentations;
