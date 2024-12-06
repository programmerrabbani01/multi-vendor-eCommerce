// types.ts
export interface Role {
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: Role; // Optional chaining allows undefined roles
}
