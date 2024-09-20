
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useGetUserBookingCarsQuery } from '@/redux/api/baseApi';
import Loading from '@/shared-components/Loading';
import { TBooking } from '@/types/allTyps';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  const user = useAppSelector((state) => state.user.user);
  const {data: completedData, isLoading: completedLoading} = useGetUserBookingCarsQuery('completed')
  const {data : canceledData, isLoading : canceledIsLoading} = useGetUserBookingCarsQuery('canceled')

  const [bookings, setBookings] = useState<TBooking[]>([])  

  useEffect(()=>{

    const combinedBooking = [
      ...(completedData?.success ? completedData.data :[]),
      ...(canceledData?.success ? canceledData.data :[]),
    ]
    setBookings(combinedBooking)
  },[completedData, canceledData])

 if(completedLoading || canceledIsLoading) {
  return <Loading />
 }

  return (
    <div className="container mx-auto py-10 px-5">
      {/* Personal Information Section */}
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <p className='text-lg'><strong>Name:</strong> {user!.name}</p>
        <p className='text-lg'><strong>Email:</strong> {user!.email}</p>
        {user!.phone && <p className='text-lg'><strong>Phone:</strong> {user!.phone}</p>}
        <Link to={'/user/update-profile'}><button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Update Profile</button></Link>
      </div>

      {/* Booking History Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        {bookings.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className='border'>
                <th className='border-x p-2 text-sm'>Car</th>
                <th className='border-x p-2 text-sm'>Date</th>
                <th className='border-x p-2 text-sm'>Start Time</th>
                <th className='border-x p-2 text-sm'>End Time</th>
                <th className='border-x p-2 text-sm'>Status</th>
                <th className='border-x p-2 text-sm'>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className='border text-center '>
                  <td className='border-x p-2 text-sm font-semibold'>{booking?.car?.name}</td>
                  <td className='border-x p-2 text-sm'>{booking.pickUpDate} to {booking.dropOffDate}</td>
                  <td className='border-x p-2 text-sm'>{booking.startTime}</td>
                  <td className='border-x p-2 text-sm'>{booking.endTime}</td>
                  <td className={`border-x p-2 text-sm font-semibold ${booking.status==='completed' && 'text-green-700'} ${booking.status==='canceled' && 'text-red-700'}`}>{booking.status}</td>
                  <td className='border-x p-2 text-sm'>${booking.totalCost}</td>
                </tr>
              ))}
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
