
import { useGetCarQuery } from '@/redux/api/baseApi';
import { TCar } from '@/redux/feautures/carSlice';
import Loading from '@/shared-components/Loading';
import ImageMagnifier from '@/utilitis/ImageMagnifier';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const reviews= [
    { id: 1, user: 'John Doe', comment: 'Amazing experience!', rating: 5 },
    { id: 2, user: 'Jane Smith', comment: 'Great car and smooth ride!', rating: 4 },
  ]



const CarDetailPage = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [car, setCar] = useState<TCar | null>(null)
  const {id} = useParams()
  const { data, isLoading} = useGetCarQuery(id)


  useEffect(()=>{
    setCar(data?.data)
  },[data])

  if(isLoading) <Loading />

  const handleFeatureSelect = (feature: string) => {
    console.log(feature)
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const additionalFeatures = ['Insurance', 'GPS', 'Child Seat'];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Car Image Section with Zoom */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4 overflow-hidden">
        <ImageMagnifier src="https://i.ibb.co.com/Fg1ZPV3/team-left.png" />
        </div>

        {/* Car Details Section */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">{car?.name}</h2>
          <p className="text-gray-600 mb-4">{car?.description}</p>
          <p className="text-gray-700 font-semibold">
            Price: <span className="text-blue-500">${car?.pricePerHour}/hour</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">Color: {car?.color}</p>
          <p className="text-sm text-gray-500 mb-4">Status: {car?.status}</p>
          <p className="text-sm text-gray-500 mb-4">
            Electric: {car?.isElectric ? 'Yes' : 'No'}
          </p>

          {/* Additional Features */}
          <div className="my-4">
            <h4 className="font-semibold mb-2">Add-ons:</h4>
            {additionalFeatures.map(feature => (
              <label key={feature} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => handleFeatureSelect(feature)}
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
          {/* Book Now Button */}
          <Link
            to={`/booking/${car?._id}`}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="mb-4 p-4 border rounded-lg shadow-sm">
              <h4 className="font-semibold">{review.user}</h4>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-yellow-500">
                Rating: {'★'.repeat(review.rating)}{' '}
                {'☆'.repeat(5 - review.rating)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default CarDetailPage;
