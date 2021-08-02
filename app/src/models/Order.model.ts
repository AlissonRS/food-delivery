import { OrderItemModel } from './OrderItem.model';
import { OrderHistoryModel } from './OrderHistory.model';
import { OrderStatus } from './OrderStatus.enum';

export interface OrderModel {
  orderId?: string;
  status: OrderStatus;
  totalAmount?: number;
  payerId?: string;
  payeeId?: string;
  createdAt: Date;
  items: OrderItemModel[];
  history: OrderHistoryModel[];
}
