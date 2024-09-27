import { TCar } from "@/types/allTyps";
import { Link } from "react-router-dom";

const ShowAllCar = ({ data }: { data: TCar[] }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data &&
          data.length >= 1 &&
          data?.map((car: TCar) => (
            <div
              key={car._id}
              className="bg-white p-6 rounded-lg shadow-md relative"
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
                    className="w-full h-auto object-cover mb-4 rounded-lg"
                  />
                </figure>
              </Link>
              <h3 className="text-xl flex justify-between font-semibold mb-2">
                <span>{car.name}</span>
                <small className="text-[12px]">type: {car.type}</small>
              </h3>
              <p className="text-gray-600 mb-4">{car.description}</p>
              <div className="text-lg font-bold mb-4">
                Price: ${car.pricePerHour}/hour
              </div>
              <Link to={`/car-details/${car._id}`}>
                <span className="mb-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                  Book Now
                </span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShowAllCar;
