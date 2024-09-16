import { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSearch = () => {
        console.log('Searching for cars in', location, 'from', startDate, 'to', endDate);
    };

    return (
        <section className="relative bg-cover bg-center h-[70vh] " style={{ backgroundImage: `url(https://i.ibb.co.com/0X1MJCQ/image.png)` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative container mx-auto flex flex-col justify-center items-center h-full text-white px-4 py-8">
                {/* Hero Content */}
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Find Your Perfect Car</h1>
                <p className="text-lg mb-8 text-center">Book your next adventure with ease.</p>
                {/* Search Bar */}
                <div className="w-[20rem] md:w-[42rem]   p-4 bg-white rounded-md shadow-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className=" p-2 border border-gray-300 rounded-md text-black"
                        />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className=" p-2 border border-gray-300 rounded-md text-black"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md text-black"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Call to Action Button */}
                <Link to="/booking" className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600">
                    Book Now
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
