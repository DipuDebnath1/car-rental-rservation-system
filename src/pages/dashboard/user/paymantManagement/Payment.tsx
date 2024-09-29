/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserBookingCarsQuery } from "@/redux/api/baseApi";
import { usePaymentProcessMutation } from "@/redux/api/paymentApi";
import Loading from "@/shared-components/Loading";
import { TBooking } from "@/types/allTyps";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Payment = () => {
  const [unpaidBooking, setUnpaidBooking] = useState<TBooking[]>();
  const [process, setProcess] = useState({ loading: false, id: "" });
  const { data, isLoading } = useGetUserBookingCarsQuery("completed");

  const [paymentProcess] = usePaymentProcessMutation();

  useEffect(() => {
    if (data?.data) {
      const booking = data?.data?.filter(
        (item: TBooking) =>
          item?.paymentStatus === "unpaid" && item?.status === "completed"
      );

      setUnpaidBooking(booking);
    }
  }, [data]);

  //   loading
  if (isLoading) {
    return <Loading />;
  }
  // payment
  const handlePayment = async (id: string) => {
    setProcess({ loading: true, id: id });
    try {
      const res = await paymentProcess(id).unwrap();
      if (res?.success && res?.data?.result) {
        window.location.href = res?.data?.payment_url;
      } else {
        setProcess({ loading: false, id: "" });
        toast.error(res.message);
      }
    } catch (err: any) {
      setProcess({ loading: false, id: "" });
      toast.error(err.message);
    }
  };

  return (
    <div className="py-5 px-5 min-h-[80vh]">
      {unpaidBooking && unpaidBooking.length > 0 ? (
        <div>
          <div>
            <h2 className="text-xl font-semibold pb-3 mt-5">
              Unpaid Completed Booking Data
            </h2>
            <div className="past-bookings space-y-4">
              {
                // eslint-disable-next-line no-unsafe-optional-chaining
              }{" "}
              {unpaidBooking.map((booking) => (
                <div
                  key={booking._id}
                  className={`booking-card p-4 border rounded-lg flex items-center md:justify-between flex-col-reverse md:flex-row space-y-5 justify-start bg-green-100`}
                >
                  {/* info  */}
                  <div className="space-y-2">
                    <span className="bg-red-500 py-1 px-2 text-white rounded ">
                      {" "}
                      {booking.paymentStatus}
                    </span>
                    <h3 className="font-semibold text-[15px] flex gap-3">
                      {booking.car.name}
                    </h3>
                    <p className="text-semibold">
                      form: {booking.pickUpDate}({booking.startTime})
                    </p>
                    <p className="text-semibold">
                      To: {booking.dropOffDate}({booking.endTime})
                    </p>
                    <p>Total Cost: ${booking.totalCost}</p>
                  </div>
                  {/* status  */}
                  <div className="flex items-center gap-5">
                    {booking.status === "completed" &&
                      booking.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePayment(booking._id)}
                          className={`bg-green-700 text-white hover:text-white px-4 py-2 rounded-md`}
                        >
                          {process.loading && process.id === booking._id
                            ? "process..."
                            : "Payment"}
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
          </div>
        </div>
      ) : (
        <div>Not Booking Data For Payment</div>
      )}
    </div>
  );
};

export default Payment;
