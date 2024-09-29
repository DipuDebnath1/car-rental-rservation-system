import { useFindAllBookingQuery } from "@/redux/api/adminApi";
import { useGetCarsQuery } from "@/redux/api/baseApi";
import Loading from "@/shared-components/Loading";
import { TBooking, TCar } from "@/types/allTyps";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const DashboardOverview = () => {
  const [totalBookings, setTotalBookings] = useState<TBooking[]>([]);
  const [availableCars, setAvailableCars] = useState<TCar[]>([]);
  const [showBooking, setShowBooking] = useState(true);

  // Fetch bookings and cars using queries
  const { data: bookingsData, isLoading: isBookingsLoading } =
    useFindAllBookingQuery(undefined);
  const { data: carsData, isLoading: isCarsLoading } =
    useGetCarsQuery("available");

  useEffect(() => {
    if (bookingsData?.success) {
      setTotalBookings(bookingsData.data);
    }
    if (carsData?.success) {
      setAvailableCars(carsData.data);
    }
  }, [bookingsData, carsData]);

  if (isBookingsLoading || isCarsLoading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-overview px-5 py-10">
      <div className="flex  gap-5 ">
        <button
          onClick={() => setShowBooking(true)}
          className=" px-4 py-2 bg-blue-600 rounded text-white font-semibold "
        >
          Show All Bookings
        </button>
        <button
          onClick={() => setShowBooking(false)}
          className=" px-4 py-2 bg-green-600 rounded text-white font-semibold "
        >
          Show Available Cars
        </button>
      </div>

      {/* booking  */}
      {totalBookings.length > 0 && showBooking && (
        <div className="pt-10">
          <h2 className="text-xl font-semibold pb-5">
            Bookings : {totalBookings.length}
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="border">
                <th className="border-x p-2 text-sm">Car</th>
                <th className="border-x p-2 text-sm">User</th>
                <th className="border-x p-2 text-sm">Date</th>
                <th className="border-x p-2 text-sm">Status</th>
                <th className="border-x p-2 text-sm">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {totalBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className={`border text-center ${
                    booking.paymentStatus === "unpaid" &&
                    booking.status === "completed" &&
                    "bg-red-100"
                  } `}
                >
                  <td className={`border-x p-2 text-sm font-semibold `}>
                    {booking?.car?.name}
                  </td>
                  <td
                    className={`border-x p-2 text-sm font-semibold ${
                      booking.status === "canceled" && "text-red-700"
                    }`}
                  >
                    {booking?.user?.name}
                  </td>
                  <td className="border-x p-2 text-sm">
                    {booking.pickUpDate} to {booking.dropOffDate}
                  </td>
                  <td
                    className={`border-x p-2 text-sm font-semibold flex justify-center items-center gap-2 ${
                      booking.status === "completed" && "text-green-700"
                    } ${booking.status === "canceled" && "text-red-700"}`}
                  >
                    {/* completed & unpaid status */}
                    {booking.status}
                    {booking.paymentStatus === "unpaid" &&
                      booking.status === "completed" && (
                        <span className="text-red-500">
                          ({booking.paymentStatus})
                        </span>
                      )}
                    {/* completed & paid status*/}
                    {booking.paymentStatus === "paid" &&
                      booking.status === "completed" && (
                        <span className="text-green-500">
                          <FaCheck />
                        </span>
                      )}
                  </td>
                  <td className="border-x p-2 text-sm">${booking.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* show available cars  */}
      {availableCars.length > 0 && !showBooking && (
        <div className="pt-10">
          <h2 className="text-xl font-semibold ">
            Available Cars : {availableCars.length}
          </h2>
          {availableCars.map((car) => (
            <div
              key={car._id}
              className="booking-card p-4 border rounded-lg flex items-center md:justify-between flex-col-reverse md:flex-row space-y-5 justify-start mt-5"
            >
              {/* info  */}
              <div>
                <h3 className="font-semibold text-[15px]">{car.name}</h3>
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
              {/* status  */}
              <div className="flex items-center gap-5"></div>
              {/* img  */}
              <figure>
                <img src={car.img} alt={car.name} className="max-w-40" />
              </figure>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
