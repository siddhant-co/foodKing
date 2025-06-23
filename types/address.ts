type Address = {
  id?: number;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  type: 'SHIPPING' | 'BILLING';
  isDefault?: boolean;
};
