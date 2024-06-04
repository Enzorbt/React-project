import React from 'react';

const MetPresentations: React.FC = () => {
    const presentations = [
        {
            title: "Garden Festival at The Met Cloisters",
            description: "On Saturday, June 8, enjoy performances, art making, garden tours, and more.",
            imageUrl: "/garden.jpeg"
        },
        {
            title: "Exhibition of Modern Art",
            description: "Explore the modern art collection featuring artists from the 20th and 21st centuries.",
            imageUrl: "/modernArtExpo.webp"
        },
        {
            title: "Pride Month",
            description: "Celebrate the remarkable contributions of the LGBTQIA+ community through special programs and digital content.",
            imageUrl: "/pride.png"
        },
        {
            title: "Timeless Jewelry",
            description: "Discover new and best-selling designs inspired by 5,000 years of art.",
            imageUrl: "/jewelry.webp"
        }
    ];

    return (
        <div className="container mx-auto p-4">
            {presentations.map((item, index) => (
                <div
                    key={index}
                    className={`flex flex-col md:flex-row bg-gray-100 p-4 rounded-lg shadow-md mb-4 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                    <img src={item.imageUrl} alt={item.title} className="w-full md:w-1/2 rounded-lg object-cover" />
                    <div className="flex flex-col justify-center p-4 md:w-1/2">
                        <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                        <p className="text-gray-700">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MetPresentations;
