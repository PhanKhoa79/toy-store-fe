import type { BlogStatus, EntityStatus, OrderStatus, PaymentStatus, ReviewStatus, UserRole } from './enums';
import type { ID, ISODateString, VndAmount } from './common';

export type AdminUserDto = {
  id: ID;
  email: string;
  fullName: string;
  phone?: string | null;
  role: Exclude<UserRole, 'guest' | 'customer'>;
  isActive: boolean;
  lockedAt?: ISODateString | null;
  lastLoginAt?: ISODateString | null;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  permissions?: PermissionDto[];
};

export type AdminCustomerDto = {
  id: ID;
  email: string;
  fullName: string;
  phone?: string | null;
  isActive: boolean;
  lockedAt?: ISODateString | null;
  lastLoginAt?: ISODateString | null;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
};

export type PermissionDto = {
  id: ID;
  module: string;
  action: string;
  description?: string | null;
};

export type RevenueSummaryDto = {
  totalRevenue: VndAmount;
  totalOrders: number;
  periodStart?: ISODateString;
  periodEnd?: ISODateString;
};

export type OrderSummaryDto = {
  status: OrderStatus;
  count: number;
  totalAmount: VndAmount;
};

export type TopProductDto = {
  productId: ID;
  productName: string;
  totalSold: number;
  totalRevenue: VndAmount;
};

export type AdminListQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export type AdminProductListQuery = AdminListQuery & {
  categoryId?: ID;
  brandId?: ID;
  status?: EntityStatus;
};

export type AdminOrderListQuery = AdminListQuery & {
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
};

export type AdminReviewListQuery = AdminListQuery & {
  status?: ReviewStatus;
  productId?: ID;
  userId?: ID;
};

export type AdminBlogListQuery = AdminListQuery & {
  status?: BlogStatus;
};

export type AdminUserListQuery = AdminListQuery & {
  role?: 'staff' | 'admin';
  isActive?: boolean;
};
