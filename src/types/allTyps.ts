export type TCar = {
    _id: string;
    name: string;
    description: string;
    img: string,
    color: string;
    isElectric: boolean;
    features: string[];
    pricePerHour: number;
    status: 'available' | 'unavailable'| 'booked' | 'maintenance';
    isDeleted: boolean;
    createdAt: string; 
    updatedAt: string; 
    __v: number;
}

export type TUser = {
    _id:string,
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'user' | 'admin';
    isBlocked: boolean,
    // bookings: mongoose.Types.ObjectId,
    address: string;
    createdAt:string,
    updatedAt:string
}

export type TBooking = {
    _id?:string,
  user: TUser;
  car: TCar;
  pickUpDate: string;
  dropOffDate: string;
  startTime: string;
  endTime: string;
  additionalFeatures?: string[];
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  paymentStatus: 'unpaid' | 'paid';
  totalCost: number;
}

export type TErrorResponse = {
    message:string,
    success:boolean,
    status: number
}