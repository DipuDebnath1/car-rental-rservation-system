import {
  useApproveBookingMutation,
  useCancelBookingMutation,
  useFindAllBookingQuery,
} from "@/redux/api/adminApi";
import {
  filterBookingByStatus,
  setBookingData,
  updateBookingStatus,
} from "@/redux/feautures/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Loading from "@/shared-components/Loading";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ManageBookings = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useFindAllBookingQuery(undefined);
  const [approveBooking] = useApproveBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();

  const dispatch = useAppDispatch();
  const bookings = useAppSelector((state) => state.booking.booking);

  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    if (data?.data) {
      dispatch(setBookingData(data.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  //   loader
  if (isLoading) {
    return <Loading />;
  }

  //   filter booking status
  const handledFilterBookingWithCategory = (status: string) => {
    setBookingStatus(status);
    dispatch(filterBookingByStatus(status));
  };

  //   handleCancelBooking
  const handleCancelBooking = (bookingId: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You Booking Cancel!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await cancelBooking({ bookingId: bookingId });
          if (result?.data?.success) {
            dispatch(updateBookingStatus({ bookingId, newStatus: "canceled" }));
            return toast.success(result?.data?.message);
          } else toast.error("Car canceled failed");
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error canceled car:", error);
    }
  };
  //   handleApproveBooking
  const handleApproveBooking = async (bookingId: string) => {
    try {
      const result = await approveBooking({ bookingId: bookingId });
      if (result?.data?.success) {
        dispatch(updateBookingStatus({ bookingId, newStatus: "confirmed" }));
        return toast.success(result?.data?.message);
      } else toast.error("Car approve failed");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error approve car:", error);
    }
  };

  return (
    <div>
      <div className="px-5 py-10">
        <h3 className="text-2xl font-semibold">Manage Bookings</h3>

        <div>
          {/* have no booking here */}
          {!bookings && (
            <p className="text-xl font-semibold pt-5"> no booking here </p>
          )}

          {/* select category  */}
          <div className="flex justify-between items-center pt-5 ">
            <div>
              <h3 className="font-semibold">Select Booking</h3>
              <select
                className="border"
                onChange={(e) =>
                  handledFilterBookingWithCategory(e.target.value)
                }
                name="select booking"
                defaultValue={""}
              >
                <option className="bg-green-100" value={""}>
                  All Booking
                </option>
                <option className="bg-yellow-100" value="pending">
                  Pending Booking
                </option>
                <option className="bg-blue-100" value="confirmed">
                  Confirmed Booking
                </option>
                <option className="bg-blue-300" value="completed">
                  Completed Booking
                </option>
                <option className="bg-red-100" value="canceled">
                  Cancelled Booking
                </option>
              </select>
            </div>
            <h2 className="text-xl font-semibold ">
              Total {bookingStatus ? bookingStatus : "all "} Booking :{" "}
              {bookings!.length}
            </h2>
          </div>

          {/* booking here */}
          {bookings && bookings!.length > 0 && (
            <div>
              {/* content  */}
              {bookings!.map((booking) => (
                <div
                  key={booking._id}
                  className={`p-4 border rounded-lg ${
                    booking.status == "completed"
                      ? "bg-blue-300"
                      : booking.status == "confirmed"
                      ? "bg-blue-100"
                      : booking.status == "pending"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                  } mt-5 text-gray-700`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-center">
                      Status: {booking.status} {/* unpaid status  */}
                      {booking.paymentStatus === "unpaid" &&
                        booking.status === "completed" && (
                          <span className="py-1 px-2 bg-red-500 text-white rounded">
                            UnPaid !
                          </span>
                        )}
                      {/* paid status  */}
                      {booking.paymentStatus === "paid" &&
                        booking.status === "completed" && (
                          <span className=" px-2 py-1 bg-green-500 text-white rounded">
                            <FaCheck className="inline text-xl pb-1 items-center" />
                          </span>
                        )}
                    </h2>

                    {/* booking confirm   */}
                    {booking.status === "pending" && (
                      <p className="flex gap-5">
                        {booking.status === "pending" && (
                          <button
                            onClick={() =>
                              handleApproveBooking(booking._id as string)
                            }
                            className="py-1 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                          >
                            booking Confirm
                          </button>
                        )}
                        {/* booking cancelled   */}
                        <button
                          onClick={() =>
                            handleCancelBooking(booking._id as string)
                          }
                          className="py-1 px-2 bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                          booking Cancel
                        </button>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center md:justify-between flex-col-reverse md:flex-row space-y-5 gap-5 justify-start">
                    {/* user  */}
                    <div className=" gap-5 ">
                      <h2 className="font-bold">User</h2>
                      <p>name : {booking.user.name}</p>
                      <p>email : {booking.user.email}</p>
                      <p>phone : {booking.user.phone}</p>
                      <p>address : {booking.user.address}</p>
                    </div>
                    {/* booking  */}
                    <div className=" gap-5 ">
                      <h2 className="font-bold">Date</h2>

                      <p>
                        start : {booking.pickUpDate} / {booking.startTime}{" "}
                      </p>
                      <p>
                        end : {booking.dropOffDate} / {booking.endTime}{" "}
                      </p>
                      <p> Total Cost : {booking.totalCost} </p>
                    </div>
                    {/* car  */}
                    <div className=" gap-5 ">
                      <h2 className="font-bold">Car</h2>
                      <figure>
                        <img
                          src={booking.car.img}
                          alt={booking.car.name}
                          className="max-w-20 rounded-lg"
                        />
                      </figure>
                      <p> Model : {booking.car.name} </p>
                      <p> Price/h : {booking.car.pricePerHour} </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
