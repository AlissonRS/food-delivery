import { OrderStatus } from './OrderStatus.enum';

export interface OrderHistoryModel {
  createdAt: Date;
  statusByUserId: string;
  orderStatus: OrderStatus;
}
