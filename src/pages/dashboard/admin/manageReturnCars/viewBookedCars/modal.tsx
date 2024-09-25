import { useState } from "react";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConfirmModal = ({ onConfirm, onCancel }: any) => {
  const [endTime, setEndTime] = useState("");

  const modalConfirm = () => {
    const data = endTime.split(":").length;
    if (data !== 2) {
      return toast.error("please enter valid date h-m 15:32");
    }
    return onConfirm(endTime);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <h2 className="text-xl font-semibold mb-4">Confirm Return Car</h2>
        <div>
          <label htmlFor="endTime">
            <span>Enter End Time hour-minute</span>
            <input
              onChange={(e) => setEndTime(e.target.value)}
              className="border-2 rounded pl-2 py-1"
              placeholder="example 15:40"
              type="text"
              id="endTime"
            />
          </label>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={modalConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
