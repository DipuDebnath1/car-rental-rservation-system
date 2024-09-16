import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-[7rem] py-10">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Logo  */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                    <Link to={'/'}>
                    <h1 className="text-2xl font-bold text-white-800 " style={{fontFamily:"cursive"}}>FlexiCar</h1></Link>
                        <p className="text-gray-400">Your reliable car rental service.</p>
                    </div>

                    {/* Navigation Menu */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Navigation Menu</h3>
                        <ul>
                            <li><Link to="/" className="text-gray-300 hover:text-gray-100">Home</Link></li>
                            <li><Link to="/about" className="text-gray-300 hover:text-gray-100">About Us</Link></li>
                            <li><Link to="/booking" className="text-gray-300 hover:text-gray-100">Booking</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-gray-100">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100">
                                <FaFacebook />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100">
                                <FaInstagram /> {/* Replace with actual icon */}
                            </a>
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400 mb-2">Road-12, Sector-3, Banashree</p>
                        <p className="text-gray-400 mb-2">Dhaka, 5100</p>
                        <p className="text-gray-400 mb-2">Email: info@flexicar.com</p>
                        <p className="text-gray-400">Phone: +880155454</p>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <ul className="flex flex-wrap justify-center space-x-4 text-gray-400">
                        <li><Link to="/privacy-policy" className="hover:text-gray-200">Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service" className="hover:text-gray-200">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
