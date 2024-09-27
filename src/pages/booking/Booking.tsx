import { useEffect, useState } from "react";
import ShowAllCar from "./components/ShowAllCar";
// import { useAppSelector } from "@/redux/hooks";
import { TCar } from "@/types/allTyps";
import { useGetCarsWithSearchCriteriaQuery } from "@/redux/api/baseApi";
import Loading from "@/shared-components/Loading";
type TSearchCriteria = {
  name?: "";
  type?: "";
  features?: "";
};

const Booking = () => {
  const [searchCriteria, setSearchCriteria] = useState<TSearchCriteria>();
  const [cars, setCars] = useState<TCar[]>();
  const { data, isLoading } = useGetCarsWithSearchCriteriaQuery(searchCriteria);
  useEffect(() => {
    setCars(data?.data);
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (searchCriteria) {
      setSearchCriteria({ ...searchCriteria, [name]: value.trim() });
    } else {
      setSearchCriteria({ [name]: value });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="py-10">
      {/* search form  */}
      <div>
        <form className="p-4 rounded-md">
          <h3 className="text-2xl pb-2 font-semibold text-gray-700">
            Find Car :
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* name Type */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Car Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="name Here"
                name="name"
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* name Features */}
            <div>
              <label
                htmlFor="features"
                className="block text-sm font-medium text-gray-700"
              >
                Car Name
              </label>
              <input
                type="text"
                id="features"
                name="features"
                onChange={handleChange}
                placeholder="AC, GPS, Bluetooth"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Car Type */}
            <div>
              <label
                htmlFor="carType"
                className="block text-sm font-medium text-gray-700"
              >
                Car Type
              </label>
              <select
                id="carType"
                name="type"
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select car type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* display all cars  */}
      <div>
        {searchCriteria && (
          <div>
            <span> Results of </span>
            {searchCriteria.name && (
              <span>
                {`->`} {searchCriteria.name}
              </span>
            )}
            {searchCriteria.type && (
              <span>
                {`->`} {searchCriteria.type}
              </span>
            )}
            {searchCriteria.features && (
              <span>
                {`->`} {searchCriteria.features}
              </span>
            )}
          </div>
        )}
        <ShowAllCar data={cars as TCar[]} />
      </div>
    </div>
  );
};

export default Booking;
