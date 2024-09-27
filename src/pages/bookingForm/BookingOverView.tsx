/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBookACarMutation } from "@/redux/api/baseApi";
import { useAppSelector } from "@/redux/hooks";
import { TCar } from "@/types/allTyps";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
type TBookingFormValues = {
  car: TCar;
  startTime: string;
  pickUpDate: string;
  dropOffDate: string;
  nidOrPassport: string;
  drivingLicense: string;
  paymentMethod: string;
  gps: boolean;
  childSeat: boolean;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BookingOverView = ({
  data,
  openModal,
  setOpenModal,
  setFormValues,
  setErrors,
}: {
  data: TBookingFormValues;
  openModal: boolean;
  setOpenModal: any;
  setFormValues: any;
  setErrors: any;
}) => {
  const user = useAppSelector((state) => state.user.user);
  const [bookACar] = useBookACarMutation();
  const navigate = useNavigate();
  const orderData = {
    car: data?.car?._id,
    pickUpDate: data?.pickUpDate,
    dropOffDate: data?.dropOffDate,
    startTime: data?.startTime,
  };

  const handleOk = async () => {
    try {
      const res = await bookACar(orderData).unwrap();
      if (res.success) {
        toast.success(res.message);
        setFormValues({
          startTime: "",
          pickUpDate: "",
          dropOffDate: "",
          nidOrPassport: "",
          drivingLicense: "",
          paymentMethod: "credit",
          gps: false,
          childSeat: false,
        });
        setErrors([]);
        setOpenModal(false);
        navigate(`/${user?.role}`);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };
  return (
    <div>
      {/* <Space>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
      </Space> */}
      <Modal
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <div className="space-y-2 ">
          <h1
            className="text-2xl font-bold text-gray-800 "
            style={{ fontFamily: "cursive" }}
          >
            FlexiCar
          </h1>
          <h3 className="text-center font-bold">Order Summery</h3>
          <hr />
          <div className="flex items-center space-y-2 justify-between">
            <div className="text-gray-700 space-y-2 text-[14px]">
              <p>
                <strong> Name :</strong> <strong>{user?.name}</strong>{" "}
                <small>({user?.email})</small>
              </p>
              <p>
                <strong> Car :</strong> {data?.car?.name}
              </p>
              <p>
                <strong> GPS :</strong> {data?.gps ? "yes" : "N/A"}
              </p>
              <p>
                <strong> ChildSeat :</strong> {data?.childSeat ? "yes" : "N/A"}
              </p>
              <p>
                <strong> NID/Passport :</strong> {data?.nidOrPassport}
              </p>
              <p>
                <strong> DrivingLicense :</strong> {data?.drivingLicense}
              </p>
              <p>
                <strong> Booking :</strong> {data?.pickUpDate}(at-
                {data.startTime})-to-
                {data?.dropOffDate}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingOverView;
