import {
  useCancelBookingMutation,
  useFindAllBookingQuery,
  useReturnBookingMutation,
} from "@/redux/api/adminApi";
import Loading from "@/shared-components/Loading";
import { TBooking } from "@/types/allTyps";
import { useState } from "react";
import ConfirmModal from "./modal";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { updateBookingStatus } from "@/redux/feautures/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";

const ViewBookedCars = () => {
  const [showModal, setShowModal] = useState(false);
  const [storeBookingId, setStoreBookingId] = useState("");

  const { data, isLoading } = useFindAllBookingQuery("confirmed");
  const dispatch = useAppDispatch();
  const [returnBooking] = useReturnBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();

  const handleCancelBooking = async (bookingId: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You Booked Cancel!",
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

  const handleReturn = async (bookingId: string) => {
    setStoreBookingId(bookingId);
    setShowModal(true);
    // await approveBooking(bookingId);
  };

  //   modal
  const handleConfirmModal = async (endTime: string) => {
    const returnInfo = {
      bookingId: storeBookingId,
      endTime: endTime,
    };
    console.log(returnInfo);
    setShowModal(false);
    try {
      const res = await returnBooking(returnInfo);
      if (res?.data.success) {
        toast.success(res?.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const handleCancelModal = () => {
    console.log("close");
    setShowModal(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="py-10 px-5">
      {data?.data?.length < 1 && (
        <h2 className="text-xl font-semibold "> No booking car here</h2>
      )}
      {data?.data?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold">All Booking Cars</h2>
          <div>
            {/* content  */}
            {data?.data?.map((booking: TBooking) => (
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
                    Status: {booking.status}
                  </h2>
                  {(booking.status === "pending" ||
                    booking.status === "confirmed") && (
                    <p className="flex gap-5">
                      <button
                        onClick={() => handleReturn(booking._id as string)}
                        className="py-1 px-2 bg-green-500 hover:bg-green-600 text-white rounded"
                      >
                        Car Return
                      </button>
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
        </div>
      )}

      {/* modal */}
      {showModal && (
        <ConfirmModal
          onConfirm={handleConfirmModal}
          onCancel={handleCancelModal}
          endTime={""}
        />
      )}
    </div>
  );
};

export default ViewBookedCars;
