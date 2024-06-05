import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-black p-4 mt-8 border-2 op">
            <div className="container mx-auto flex justify-between space-x-4 text-white font-bold">
                <Link to="/search?departmentId=21&page=1" className="hover:text-gray-400">
                    Modern Art
                </Link>
                <div className="border-l-2 bg-white"></div>
                <Link to="/search?departmentId=17&page=1" className="text-white hover:text-gray-600">
                    Medieval Art
                </Link>
                <div className="border-l-2 bg-white"></div>
                <Link to="/search?departmentId=14&page=1" className="text-white hover:text-gray-400">
                    Islamic Art
                </Link>
                <div className="border-l-2 bg-white"></div>
                <Link to="/search?departmentId=6&page=1" className="text-white hover:text-gray-400">
                    Asian art
                </Link>
                <div className="border-l-2 bg-white"></div>
                <Link to="/search?departmentId=10&page=1" className="text-white hover:text-gray-400">
                    Egyptian Art
                </Link>
                <div className="border-l-2 bg-white"></div>
                <Link to="/search?departmentId=13&page=1" className="text-white hover:text-gray-400">
                    Greek and Roman Art
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
