import { useGetCarsQuery } from "@/redux/api/baseApi";
import Loading from "@/shared-components/Loading";
import { TCar } from "@/types/allTyps";
import { useEffect, useState } from "react";

const ManagedCars = () => {
  const [cars, setCars] = useState<TCar[]>([]);

  const { data, isLoading } = useGetCarsQuery(undefined);

  useEffect(() => {
    if (data?.success) {
      setCars(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-5 py-10 relative">
      {/* show available cars  */}
      {cars.length < 1 && <h2>No cars Here ....</h2>}
      <div className="top-0 flex items-center justify-end">
        <button className="rounded text-white font-semibold px-4 py-2 bg-green-500 hover:bg-green-600">
          Add new car
        </button>
      </div>
      {cars.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold ">Total Cars : {cars.length}</h2>
          {cars.map((car) => (
            <div
              key={car._id}
              className="booking-card p-4 border rounded-lg flex items-center md:justify-between flex-col-reverse md:flex-row space-y-5 gap-5 justify-start mt-5"
            >
              {/* info  */}
              <div className="flex items-center justify-between gap-5 md:w-[70%]">
                <div>
                  <h3 className="font-semibold text-[15px]">
                    {car.name} <small>({car.status})</small>
                  </h3>
                  <p className="">{car.description}</p>
                  <p className="">Price/h : {car.pricePerHour}</p>
                  <p className="">Color : {car.color}</p>
                  <p className="">
                    Features :{" "}
                    {car.features.map((item) => (
                      <span className=""> {item} ,</span>
                    ))}
                  </p>
                </div>

                <div className="md:space-x-5 space-y-5">
                  <button className="rounded text-white font-semibold px-4 py-2 bg-blue-500 hover:bg-blue-600">
                    {" "}
                    Update car{" "}
                  </button>
                  <button className="rounded text-white font-semibold px-4 py-2 bg-red-500 hover:bg-red-600">
                    {" "}
                    Delete car{" "}
                  </button>
                </div>
              </div>

              <figure className="md:max-w-[30%]">
                <img src={car.img} alt={car.name} className="w-40" />
              </figure>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagedCars;
