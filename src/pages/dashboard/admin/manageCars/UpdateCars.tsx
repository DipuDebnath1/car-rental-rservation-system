import { useUpdateCarMutation } from "@/redux/api/adminApi";
import { useGetCarQuery } from "@/redux/api/baseApi";
import Loading from "@/shared-components/Loading";
import { TCar } from "@/types/allTyps";
import { ImageUpload } from "@/utilities/imageUpload";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

type TFormData = {
  name?: string;
  description?: string;
  img?: string;
  color?: string;
  isElectric?: boolean;
  isDeleted?: boolean;
  features?: string[];
  pricePerHour?: number;
  status?: string;
  type?: string;
};

const UpdateCars = () => {
  const [updateCar] = useUpdateCarMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetCarQuery(id);
  const [car, setCar] = useState<TCar>();

  useEffect(() => {
    if (data?.data) {
      setCar(data.data);
    }
  }, [data]);

  const [formData, setFormData] = useState<TFormData>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataItem = Object.keys(formData!);

    if (formDataItem.length < 1) {
      return toast.error("you can't update car data");
    }

    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You update car data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,Update!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await updateCar({ data: formData, id: car?._id });
          if (result.data.success) {
            return toast.success(result.data.message);
          } else toast.error("Car Update failed");
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error adding car:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = async (e: any) => {
    try {
      // local url
      const imageLink = await ImageUpload(e);
      // const localUrl = URL.createObjectURL(e);
      if (imageLink) {
        console.log(imageLink);
        setFormData({ ...formData, img: imageLink });
      }
      // console.log(e);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      {!car && (
        <div>
          <h3>car not found</h3>
        </div>
      )}
      {car && (
        <div>
          <h2 className={`text-2xl font-bold mb-4`}>Update {car.name} Car</h2>
          {car.isDeleted && (
            <h2
              className={`text-lg font-bold mb-4 ${
                car.isDeleted && "text-red-500"
              }`}
            >
              This Car Already Deleted
            </h2>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Car Name"
              defaultValue={car.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Car Description"
              defaultValue={car.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image</label>
            {formData && formData?.img ? (
              <img src={formData?.img} alt="image" className="h-32 w-auto" />
            ) : (
              <>
                <img src={car.img} alt="image" className="h-32 w-auto" />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e.target.files?.[0])}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Color</label>
            <input
              type="text"
              placeholder="Car Color"
              defaultValue={car.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Electric Car
            </label>
            <input
              type="checkbox"
              checked={car.isElectric}
              onChange={(e) =>
                setFormData({ ...formData, isElectric: e.target.checked })
              }
              className="mr-2"
            />
            <span>Is Electric?</span>
          </div>

          {car.isDeleted && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-red-500">
                Update Delete Status
              </label>
              <input
                id="delete"
                type="checkbox"
                checked={car.isDeleted}
                onChange={(e) =>
                  setFormData({ ...formData, isDeleted: !e.target.checked })
                }
                className="mr-2"
              />
              <label htmlFor="delete" className="font-semibold text-green-700">
                Remove Delete List
              </label>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Features</label>
            <p>
              {car.features.map((feature, i) => (
                <span key={i}> {feature} </span>
              ))}
            </p>
            <input
              type="text"
              placeholder="Features (comma separated)"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  features: e.target.value.split(","),
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Price Per Hour
            </label>
            <input
              type="number"
              placeholder="Price Per Hour"
              defaultValue={car.pricePerHour}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pricePerHour: parseFloat(e.target.value),
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              defaultValue={car.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Update Car
          </button>
        </div>
      )}
    </form>
  );
};

export default UpdateCars;
