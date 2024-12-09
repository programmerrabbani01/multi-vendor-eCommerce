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
