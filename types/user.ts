// types/user.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface AuthCustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  // Add any additional fields returned by your login API
}
