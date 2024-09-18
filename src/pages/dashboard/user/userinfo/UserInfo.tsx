
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

const UserInfo = () => {
  const user = useAppSelector((state) => state.user.user);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
    //   Fetch booking history for the logged-in user
    //   fetchBookingHistory(user.id)
    //     .then((data) => setBookings(data))
    //     .catch((err) => console.error('Error fetching bookings:', err));
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-10">
      {/* Personal Information Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Edit Profile</button>
      </div>

      {/* Booking History Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        {bookings.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>Car</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {/* {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.carName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.startTime}</td>
                  <td>{booking.endTime}</td>
                  <td>${booking.totalCost}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
