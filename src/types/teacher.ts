export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string; // optional qiling, update holatida kerak emas
  phone: string;
  role: string;
  branchId: number[]; // formga yuboriladigan
  branches?: { id: number; name: string }[]; // update uchun optional va typed
}
