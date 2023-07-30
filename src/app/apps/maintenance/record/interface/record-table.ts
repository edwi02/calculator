export interface Record {
  pagination: Pagination;
  data: DataResult[];
}

export interface DataResult {
  id: string;
  amount: number;
  balance: number;
  operationResponse: string;
  date: string;
  isDeleted: boolean;
  user: User;
  operation: Operation;
}

interface Operation {
  id: string;
  type: string;
  cost: string;
  isActive: boolean;
  isDeleted: boolean;
}

interface User {
  id: string;
  username: string;
  status: string;
  isDeleted: boolean;
  roles: string[];
}

interface Pagination {
  limitRows: number;
  offsetRows: number;
  totalRows: number;
}