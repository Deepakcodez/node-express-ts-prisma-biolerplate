export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface SizeCreateRequest {
  name: string;
  categoryId: string;
}
export interface categoryCreateRequest {
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
     username: string;
     phone: string
  };
  token: string;
}

export interface SizeCreateResponse {
  size: SizeT;
}



export interface getSizeResponse {
  size: SizeT;
}




export interface UserT {
  id: string;
  username: string;
  email: string;
  phone : string
  password: string;
  role: string;
  address: AddressT[];
  addressId?: number;
  orders: OrderT[];
  resetPasswordToken?: string;
  resetPasswordExpire?: string;
  createdAt: string;
  updatedAt: string;
  Payment: PaymentT[];
}

export interface AddressT {
  id: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  userId?: string;
  Order: OrderT[];
}

export interface OrderT {
  id: string;
  quantity?: number;
  clientId?: string;
  client?: UserT;
  addressId: string;
  address: AddressT;
  totalPrice: number;
  totalQuantity: number;
  deliveryCharges: number;
  status?: string;
  paymentMethod?: string;
  expectedDeliveryDate?: string;
  isPaid: boolean;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItemT[];
  Payment: PaymentT[];
}

export interface OrderItemT {
  id: string;
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  order: OrderT;
  product: ProductT;
}

export interface ProductT {
  id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  categoryId?: string;
  category?: CategoryT;
  subcategoryId?: string;
  subcategory?: SubCategoryT;
  sizeId?: string;
  size?: SizeT;
  qualityId?: string;
  quality?: QualityT;
  colors: ColorT[];
  images: ProductImageT[];
  createdAt: string;
  updatedAt: string;
  OrderItem: OrderItemT[];
}

export interface ProductImageT {
  id: string;
  productId: string;
  product: ProductT;
  publicId: string;
  url: string;
  rank: number;
}

export interface PaymentT {
  id: number;
  orderId: string;
  order: OrderT;
  userId: string;
  user: UserT;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryT {
  id: string;
  name: string;
  subcategories: SubCategoryT[];
  createdAt: string;
  updatedAt: string;
  Product: ProductT[];
  Size: SizeT[];
}

export interface SubCategoryT {
  id: string;
  name: string;
  parentCategory: string;
  category: CategoryT;
  Product: ProductT[];
}

export interface ColorT {
  id: string;
  name: string;
  products: ProductT[];
  createdAt: string;
  updatedAt: string;
}

export interface QualityT {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  Product: ProductT[];
}

export interface SizeT {
  id: string;
  name: string;
  categoryId?: string;
  category?: CategoryT;
  createdAt: string | Date;
  updatedAt: string | Date;
  Product: ProductT[];
}
