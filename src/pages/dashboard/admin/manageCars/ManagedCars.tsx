import { useDeleteCarMutation } from "@/redux/api/adminApi";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ManagedCars = () => {
  const [deleteCar] = useDeleteCarMutation();

  const carData = useAppSelector((state) => state.cars.cars);

  const handleDeleteCar = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You delete car data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await deleteCar(id);
          if (result.data.success) {
            return toast.success(result.data.message);
          } else toast.error("Car Update failed");
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="px-5 py-10 relative">
      {/* show available cars  */}
      {carData!.length < 1 && <h2>No cars Here ....</h2>}
      <div className="top-0 flex items-center justify-end">
        <button className="rounded text-white font-semibold px-4 py-2 bg-green-500 hover:bg-green-600">
          Add new car
        </button>
      </div>
      {carData!.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold ">
            Total Cars : {carData!.length}
          </h2>
          {carData!.map((car) => (
            <div
              key={car._id}
              className="booking-card p-4 border rounded-lg flex items-center md:justify-between flex-col-reverse md:flex-row space-y-5 gap-5 justify-start mt-5"
            >
              {/* info  */}
              <div className="flex items-center justify-between gap-5 md:w-[70%]">
                <div>
                  {car.isDeleted && (
                    <p className={`text-red-600 font-semibold`}> Deleted</p>
                  )}
                  <h3
                    className={`font-semibold text-[15px] ${
                      car.isDeleted && "text-red-500"
                    }`}
                  >
                    {car.name} <small>({car.status})</small>
                  </h3>
                  <p className="">{car.description}</p>
                  <p className="">Price/h : {car.pricePerHour}</p>
                  <p className="">Color : {car.color}</p>
                  <p className="">
                    Features :{" "}
                    {car.features.map((item, i) => (
                      <span key={i}> {item} ,</span>
                    ))}
                  </p>
                </div>

                <div className="md:space-x-5 space-y-5">
                  <Link
                    to={`/admin/update-cars/${car._id}`}
                    className="rounded text-white font-semibold px-4 py-2 bg-blue-500 hover:bg-blue-600"
                  >
                    {" "}
                    Update car{" "}
                  </Link>
                  {car.isDeleted ? (
                    <button className="rounded text-white font-semibold px-4 py-2 bg-red-300">
                      {" "}
                      Deleted{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      className="rounded text-white font-semibold px-4 py-2 bg-red-500 hover:bg-red-600"
                    >
                      {" "}
                      Delete car{" "}
                    </button>
                  )}
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
