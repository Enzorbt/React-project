import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-black text-white py-12 md:py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-center items-center md:items-start">
                <div className="text-3xl font-bold md:text-5xl mb-4 md:mb-0 flex items-center">
                    <span>The Met</span>
                    <img src="/MMIcon.png" alt="The Met Logo" className="w-10 h-10 md:w-16 md:h-16 ml-4"/>
                </div>
            </div>
            <div className="container mx-auto flex justify-center mt-4">
                <div className="md:text md:mt-4  p-2">Website developed by SupKnowledge.</div>
                <div className="md:text md:mt-4 border-l-2  p-2">&copy; 2024 The Met. All Rights Reserved.</div>
            </div>
            <div className="container mx-auto flex justify-end mt-4">
                <div className="flex items-center space-x-4">
                    <img src="/X.png" alt="Twitter" className="w-8 h-8"/>
                    <img src="/pinterest.webp" alt="Pinterest" className="w-8 h-8"/>
                    <img src="/facebook.png" alt="Facebook" className="w-8 h-8"/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
