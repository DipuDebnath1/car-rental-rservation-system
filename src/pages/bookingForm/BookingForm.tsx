/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCarQuery } from "@/redux/api/baseApi";
import Loading from "@/shared-components/Loading";
import { TCar } from "@/types/allTyps";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingOverView from "./BookingOverView";

type TBookingFormValues = {
  car: TCar | null;
  startTime: string;
  pickUpDate: string;
  dropOffDate: string;
  nidOrPassport: string;
  drivingLicense: string;
  paymentMethod: string;
  gps: boolean;
  childSeat: boolean;
};

const BookingForm: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCarQuery(id);

  // Initialize state for form values
  const [formValues, setFormValues] = useState<TBookingFormValues>({
    car: null,
    startTime: "",
    pickUpDate: "",
    dropOffDate: "",
    nidOrPassport: "",
    drivingLicense: "",
    paymentMethod: "credit", // Default payment method
    gps: false,
    childSeat: false,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (data) {
      setFormValues({ ...formValues, car: data.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) <Loading />;

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: string[] = [];

    // Basic validation
    if (!formValues.nidOrPassport) {
      validationErrors.push("NID/Passport is required.");
    }
    if (!formValues.drivingLicense) {
      validationErrors.push("Driving License is required.");
    }

    // If there are errors, set them and return
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setOpenModal(true);
    // Reset the form on successful submission
    // setFormValues({
    //   car: null,
    //   startTime: "",
    //   pickUpDate: "",
    //   dropOffDate: "",
    //   nidOrPassport: "",
    //   drivingLicense: "",
    //   paymentMethod: "credit",
    //   gps: false,
    //   childSeat: false,
    // });
    // setErrors([]);
  };

  return (
    <div className="py-10 px-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">Booking Form</h2>

        {/* Car Input */}
        <div>
          <label htmlFor="car" className="block mb-1">
            Car:
          </label>
          <input
            type="text"
            readOnly
            name="car"
            id="car"
            defaultValue={formValues.car?.name}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/*  Date */}
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label htmlFor="pick" className="block mb-1">
              PickUp Date
            </label>
            <input
              type="date"
              name="pickUpDate"
              id="pick"
              value={formValues.pickUpDate}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="drop" className="block mb-1">
              Drop Off Date
            </label>
            <input
              type="date"
              name="dropOffDate"
              id="drop"
              value={formValues.dropOffDate}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block mb-1">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              id="startTime"
              value={formValues.startTime}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
        </div>

        {/* NID/Passport Input */}
        <div>
          <label htmlFor="nidOrPassport" className="block mb-1">
            NID/Passport:
          </label>
          <input
            type="text"
            name="nidOrPassport"
            id="nidOrPassport"
            value={formValues.nidOrPassport}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        {/* Driving License Input */}
        <div>
          <label htmlFor="drivingLicense" className="block mb-1">
            Driving License:
          </label>
          <input
            type="text"
            name="drivingLicense"
            id="drivingLicense"
            value={formValues.drivingLicense}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        {/* Payment Method Selection */}
        <div>
          <label htmlFor="paymentMethod" className="block mb-1">
            Payment Method:
          </label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            value={formValues.paymentMethod}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="mobileBanking">Mobile Banking</option>
          </select>
        </div>

        {/* Additional Options */}
        <div>
          <label className="block mb-1">Additional Options:</label>
          <div>
            <input
              type="checkbox"
              name="gps"
              id="gps"
              checked={formValues.gps}
              onChange={handleChange}
            />
            <label htmlFor="gps" className="ml-2">
              GPS
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="childSeat"
              id="childSeat"
              checked={formValues.childSeat}
              onChange={handleChange}
            />
            <label htmlFor="childSeat" className="ml-2">
              Child Seat
            </label>
          </div>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="text-red-600">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-5 rounded"
        >
          Submit
        </button>
      </form>

      {/* booking confirmation model  */}
      <div>
        <BookingOverView
          openModal={openModal as boolean}
          setOpenModal={setOpenModal as any}
          data={formValues as any}
          setFormValues={setFormValues}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
};

export default BookingForm;
