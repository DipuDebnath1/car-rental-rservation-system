import { usePostCarMutation } from "@/redux/api/adminApi";
import { useState } from "react";
import { toast } from "sonner";

const AddNewCar = () => {
  const [postCar] = usePostCarMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img: "",
    color: "",
    isElectric: false,
    features: [] as string[],
    pricePerHour: 0,
    status: "available",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    img: "",
    color: "",
    isElectric: "",
    features: "",
    pricePerHour: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      description: "",
      img: "",
      color: "",
      isElectric: "",
      features: "",
      pricePerHour: "",
    };

    // Name Validation
    if (formData.name.trim().length === 0) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Description Validation
    if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      isValid = false;
    }

    // Image URL Validation
    if (formData.img.trim().length === 0) {
      newErrors.img = "Please enter a image URL";
      isValid = false;
    }

    // Color Validation
    if (formData.color.trim().length === 0) {
      newErrors.color = "Color is required";
      isValid = false;
    }

    // Features Validation
    if (formData.features.length === 0) {
      newErrors.features = "At least one feature is required";
      isValid = false;
    }

    // Price Per Hour Validation
    if (formData.pricePerHour <= 0) {
      newErrors.pricePerHour = "Price per hour must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Uncomment when connected to API
        const result = await postCar(formData).unwrap();
        console.log(formData);

        console.log(result);

        if (result.success) {
          setFormData({
            name: "",
            description: "",
            img: "",
            color: "",
            isElectric: false,
            features: [] as string[],
            pricePerHour: 0,
            status: "available",
          });
          toast.success(result.message);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message);
        console.error("Error adding car:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Car</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          placeholder="Car Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          placeholder="Car Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          value={formData.img}
          onChange={(e) => setFormData({ ...formData, img: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.img && <p className="text-red-500 text-sm">{errors.img}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Color</label>
        <input
          type="text"
          placeholder="Car Color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Electric Car</label>
        <input
          type="checkbox"
          checked={formData.isElectric}
          onChange={(e) =>
            setFormData({ ...formData, isElectric: e.target.checked })
          }
          className="mr-2"
        />
        <span>Is Electric?</span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Features</label>
        <input
          type="text"
          placeholder="Features (comma separated)"
          onChange={(e) =>
            setFormData({ ...formData, features: e.target.value.split(",") })
          }
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.features && (
          <p className="text-red-500 text-sm">{errors.features}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price Per Hour</label>
        <input
          type="number"
          placeholder="Price Per Hour"
          value={formData.pricePerHour}
          onChange={(e) =>
            setFormData({
              ...formData,
              pricePerHour: parseFloat(e.target.value),
            })
          }
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.pricePerHour && (
          <p className="text-red-500 text-sm">{errors.pricePerHour}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="booked">Booked</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
      >
        Add Car
      </button>
    </form>
  );
};

export default AddNewCar;
