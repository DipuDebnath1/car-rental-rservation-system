import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CarListingPage = () => {
  const [carType, setCarType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const cars = useAppSelector(state=>state.cars.cars)

  // Filter cars based on user input
  const filteredCars = cars!.filter(car => {
    const withinPriceRange =
      (minPrice === '' || car.pricePerHour >= parseInt(minPrice)) &&
      (maxPrice === '' || car.pricePerHour <= parseInt(maxPrice))
        // const matchesType = carType === '' || car.type === carType;

    return (withinPriceRange 
        // && matchesType
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Filter Cars</h2>
        <div className="flex space-x-4">
          {/* Car Type Filter */}
          <div>
            <label className="block text-gray-700">Car Type</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={carType}
              onChange={e => setCarType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="SUV">SUV</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Sedan">Sedan</option>
              {/* Add other car types if needed */}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-gray-700">Min Price (per hour)</label>
            <input
              type="number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder="Min Price"
            />
          </div>
          <div>
            <label className="block text-gray-700">Max Price (per hour)</label>
            <input
              type="number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder="Max Price"
            />
          </div>
        </div>
      </div>

      {/* Car Listing Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map(car => (
          <div key={car._id} className="bg-white  p-6 rounded-lg shadow-md relative">
            <div className='absolute top-0'>
                {car.status==='unavailable' && <span className='text-red-500 font-semibold'>{car.status}</span>}

            </div>
            <img src={'https://i.ibb.co.com/Fg1ZPV3/team-left.png'} alt={car.name} className="h-[20rem] w-full object-cover mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
            <p className="text-gray-600 mb-4">{car.description}</p>
            <div className="text-lg font-bold mb-4">Price: ${car.pricePerHour}/hour</div>
            <div className="mb-4">
              {/* <span className="text-sm font-medium text-gray-700">Type:{car.isElectric} </span> */}
            </div>
            <Link to={`/car-details/${car._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarListingPage;
