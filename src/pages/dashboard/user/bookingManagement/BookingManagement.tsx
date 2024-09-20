import {
  useGetUpcomingBookingQuery,
  useGetUserBookingCarsQuery,
  useUserCancelHisBookingMutation,
} from "@/redux/api/baseApi";
import Loading from "@/shared-components/Loading";
import { TBooking } from "@/types/allTyps";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const BookingManagement = () => {
  const { data: upcoming, isLoading } = useGetUpcomingBookingQuery(undefined);
  const [upcomingBookings, setUpcomingBookings] = useState<TBooking[]>([]);
  const [pastBookings, setPastBookings] = useState<TBooking[]>([]);

  const { data: completedData, isLoading: completedLoading } =useGetUserBookingCarsQuery("completed");
  const { data: canceledData, isLoading: canceledIsLoading } =useGetUserBookingCarsQuery("canceled");
    const [userCancelHisBooking]  = useUserCancelHisBookingMutation()

  // set booking car
  useEffect(() => {
    // set upcoming booking car
    if (upcoming?.success) {
      setUpcomingBookings(upcoming?.data);
    }
    // set past booking car
    const combinedBooking = [
      ...(completedData?.success ? completedData.data : []),
      ...(canceledData?.success ? canceledData.data : []),
    ];
    setPastBookings(combinedBooking);
  }, [upcoming, completedData, canceledData]);

  // loader 
  if (isLoading || completedLoading || canceledIsLoading) {
    return <Loading />;
  }

// handle cancelled booking 
const handleCancelBooking = (bookingId: string) =>{
  try{
    Swal.fire({
      title: "Are you sure?",
      text: "You Cancelled your Booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Cancelled!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const result = await userCancelHisBooking({bookingId:bookingId})
        if(result.data.success){
         return toast.success(result.data.message)
        }
      }
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(err:any){
    toast.error(err?.message || "An error occurred during the cancellation process")
  }
}

  return (
    <div className="py-10 px-5">
      <h1 className="text-2xl font-bold">Booking Management</h1>
      <div className="bookings-section mt-8">
        {/* upcoming booking  */}
        { upcomingBookings.length > 0 && <div>
          <h2 className="text-xl font-semibold pb-3">Upcoming Bookings</h2>
          <div className="past-bookings space-y-4">
            {
              upcomingBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="booking-card p-4 border rounded-lg flex items-center md:justify-between flex-col-reverse md:flex-row space-y-5 justify-start "
                >
                  {/* info  */}
                  <div>
                    <h3 className="font-semibold text-[15px]">
                      {booking.car.name}
                    </h3>
                    <p className="text-semibold">
                      Date: {booking.pickUpDate} to {booking.dropOffDate}
                    </p>
                    <p className="text-semibold">Time: {booking.startTime}</p>
                    <p>Total Cost: ${booking.totalCost}</p>
                  </div>
                  {/* status  */}
                  <div className="flex items-center gap-5">
                    <button
                      className={`bg-${
                        booking.status === "confirmed" ? "green" : "yellow"
                      }-500 text-white px-4 py-2 rounded-md`}
                    >
                      {booking.status}
                    </button>
                    {booking.status == "pending" && (
                      <button onClick={()=>handleCancelBooking(booking._id as string)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        {" "}
                        Cancel booking
                      </button>
                    )}
                  </div>
                  {/* img  */}
                  <figure>
                    <img
                      src={booking.car.img}
                      alt={booking.car.name}
                      className="max-w-40"
                    />
                  </figure>
                </div>
              ))}
          </div>
        </div>}

              {/* past booking  */}
       { pastBookings.length > 0 && <div>
          <h2 className="text-xl font-semibold pb-3 mt-5">Upcoming Bookings</h2>
          <div className="past-bookings space-y-4">
            {
              pastBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="booking-card p-4 border rounded-lg flex items-center md:justify-between flex-col-reverse md:flex-row space-y-5 justify-start "
                >
                  {/* info  */}
                  <div>
                    <h3 className="font-semibold text-[15px]">
                      {booking.car.name}
                    </h3>
                    <p className="text-semibold">
                      Date: {booking.pickUpDate} to {booking.dropOffDate}
                    </p>
                    <p className="text-semibold">Time: {booking.startTime}</p>
                    <p>Total Cost: ${booking.totalCost}</p>
                  </div>
                  {/* status  */}
                  <div className="flex items-center gap-5">
                    <button
                      className={`bg-${
                        booking.status === "completed" ? "green-700" : "red-500"
                      } text-white px-4 py-2 rounded-md`}
                    >
                      {booking.status}
                    </button>

                  </div>
                  {/* img  */}
                  <figure>
                    <img
                      src={booking.car.img}
                      alt={booking.car.name}
                      className="max-w-40"
                    />
                  </figure>
                </div>
              ))}
          </div>
        </div>}
      </div>

         {upcomingBookings.length < 1 && pastBookings.length < 1 && <div>
             <p>No past bookings.</p>
          </div>}
            
    </div>
  );
};

export default BookingManagement;
