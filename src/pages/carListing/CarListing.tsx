import { useAppSelector } from "@/redux/hooks";
import { TCar } from "@/types/allTyps";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CarListingPage = () => {
  const [carType, setCarType] = useState("");
  const [filteredCars, setFilteredCars] = useState<TCar[]>();
  const cars = useAppSelector((state) => state.cars.cars);
  // Filter cars based on user input
  useEffect(() => {
    if (carType && carType !== "all" && cars && cars.length > 0) {
      const res = cars.filter((item) => item.type === carType);
      setFilteredCars(res);
    } else if (cars && cars.length > 0) {
      setFilteredCars(cars);
    }
  }, [cars, carType]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Filter Cars</h2>
        <div className="flex gap-5 items-center">
          {/* Car Type Filter */}
          <p className="text-gray-700"> Select Car Type :</p>
          <select
            className="mt-1 border-gray-300 rounded-md shadow-lg py-1 px-3 border-t"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="SUV">SUV</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Sedan">Sedan</option>
            {/* Add other car types if needed */}
          </select>
        </div>
      </div>

      {/* Car Listing Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars &&
          filteredCars.length > 0 &&
          filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white  p-6 rounded-lg shadow-md relative"
            >
              <div className="absolute top-0">
                {car.status === "unavailable" && (
                  <span className="text-red-500 font-semibold">
                    {car.status}
                  </span>
                )}
              </div>
              <Link to={`/car-details/${car._id}`}>
                <figure>
                  <img
                    src={car.img}
                    alt={car.name}
                    className=" w-full object-cover mb-4 rounded-lg"
                  />
                </figure>
              </Link>
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600 mb-4">{car.description}</p>
              <div className="text-lg font-bold mb-4">
                Price: ${car.pricePerHour}/hour
              </div>
              <div className="mb-4">
                {/* <span className="text-sm font-medium text-gray-700">Type:{car.isElectric} </span> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CarListingPage;
