import type { TablePaginationConfig } from "antd";
import type { ReactNode } from "react";

export interface ProtectedRoute {
  children: ReactNode;
}

export interface ModalProps {
  open: boolean;
  toggle: () => void;
}

export interface ParamsType {
  page: number;
  limit: number;
}

export interface PaginationConfig {
  pagination: TablePaginationConfig;
  setParams: (params: ParamsType) => void;
}

export interface Lessons {
  id: number;
  notes: string;
  title: string;
  status: string;
  date: string;
  studentId?: number;
}
