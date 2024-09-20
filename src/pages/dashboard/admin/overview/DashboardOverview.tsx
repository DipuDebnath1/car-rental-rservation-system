import { useGetCarsQuery } from "@/redux/api/baseApi";
import { useEffect, useState } from "react";

const DashboardOverview = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [availableCars, setAvailableCars] = useState(0);

  // Fetch bookings and cars using queries
  const { data: bookingsData, isLoading: isBookingsLoading } = useGetCarsQuery(undefined);
  const { data: carsData, isLoading: isCarsLoading } = useGetCarsQuery(undefined)

  useEffect(() => {
    if (bookingsData?.success) {
      setTotalBookings(bookingsData.total);
    }
    if (carsData?.success) {
      setAvailableCars(carsData.total);
    }
  }, [bookingsData, carsData]);

  if (isBookingsLoading || isCarsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-overview">
      <div className="stat-card">
        <h3>Total Bookings</h3>
        <p>{totalBookings}</p>
      </div>
      <div className="stat-card">
        <h3>Available Cars</h3>
        <p>{availableCars}</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
