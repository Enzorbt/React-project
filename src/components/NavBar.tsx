

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-black p-4 mt-8">
            <div className="container mx-auto flex justify-between space-x-4 text-white font-bold">
                <Link to="/sculpture" className="hover:text-gray-400">
                    Sculpture
                </Link>
                <Link to="/modern-art" className="text-white hover:text-gray-600 ">
                    Modern Art
                </Link>
                <Link to="/painting" className="text-white hover:text-gray-400">
                    Painting
                </Link>
                <Link to="/painting" className="text-white hover:text-gray-400">
                    Gothic
                </Link>
                <Link to="/painting" className="text-white hover:text-gray-400">
                    Expos
                </Link>
                <Link to="/painting" className="text-white hover:text-gray-400">
                    Others
                </Link>


            </div>
        </nav>
    );
};

export default Navbar;
