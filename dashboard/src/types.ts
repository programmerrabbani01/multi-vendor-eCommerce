// types.ts
export interface Role {
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  gender: string;
  photo: string;
  role?: Role; // Optional chaining allows undefined roles
}

export interface HeaderProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PaginationProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalItem: number;
  parPage: number;
  showItem: number; // Optional prop
}

export interface Category {
  id: string | number;
  name: string;
}
export interface Brand {
  id: number;
  name: string;
}

export interface Color {
  id: string | number;
  name: string;
  colorCode: string;
}
export interface Size {
  id: number;
  name: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateCategoryData {
  DataId: string;
  formData: FormData;
}

export interface UpdateBrandData {
  DataId: string;
  formData: FormData;
}
