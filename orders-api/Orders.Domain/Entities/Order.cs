using Orders.Domain.Enums;
using System.Collections.Generic;
using System.Linq;

namespace Orders.Domain.Entities
{
    public class Order : BaseEntity
    {
        public string PayerId { get; set; }
        public string PayeeId { get; set; }
        public OrderStatus Status { get; protected set; }
        public decimal TotalAmount { get; set; }
        public virtual ICollection<OrderItem> Items { get; set; }
        public virtual ICollection<OrderHistory> History { get; set; }

        public Order()
        {
            this.Status = OrderStatus.Placed;
            this.Items = new HashSet<OrderItem>();
            this.History = new HashSet<OrderHistory>();
        }

        public bool UpdateStatus(OrderStatus status, string userId)
        {
            var isPayee = this.PayeeId == userId;
            var isPayer = this.PayerId == userId;
            var availableStatus = isPayee ? this.GetPossibleNextStatusForPayee() : (isPayer ? this.GetPossibleNextStatusForPayer() : new OrderStatus[] { });
            if (availableStatus.Contains(status))
            {
                this.Status = status;
                this.History.Add(new OrderHistory
                {
                    OrderStatus = status,
                    StatusByUserId = userId
                });
                return true;
            }
            return false;
        }

        /// <summary>
        /// Return possible next status for Payee given a current status.
        /// Order status is not allowed to move back to previous status.
        /// </summary>
        /// <param name="currentStatus"></param>
        /// <returns></returns>
        public OrderStatus[] GetPossibleNextStatusForPayee()
        {
            // order status is not allowed to move back to previous status
            switch (this.Status)
            {
                case OrderStatus.Placed:
                    return new OrderStatus[] { OrderStatus.Processing };
                case OrderStatus.Cancelled:
                    return new OrderStatus[] { };
                case OrderStatus.Processing:
                    return new OrderStatus[] { OrderStatus.InRoute };
                case OrderStatus.InRoute:
                    return new OrderStatus[] { OrderStatus.Delivered };
                case OrderStatus.Delivered:
                    return new OrderStatus[] { };
                case OrderStatus.Received:
                    return new OrderStatus[] { };
                default:
                    return new OrderStatus[] { };
            }
        }

        /// <summary>
        /// Return possible next status for Payer given a current status.
        /// Order status is not allowed to move back to previous status.
        /// </summary>
        /// <param name="currentStatus"></param>
        /// <returns></returns>
        public OrderStatus[] GetPossibleNextStatusForPayer()
        {
            // order status is not allowed to move back to previous status
            switch (this.Status)
            {
                case OrderStatus.Placed:
                    return new OrderStatus[] { OrderStatus.Cancelled };
                case OrderStatus.Cancelled:
                    return new OrderStatus[] { };
                case OrderStatus.Processing:
                    return new OrderStatus[] { };
                case OrderStatus.InRoute:
                    return new OrderStatus[] { };
                case OrderStatus.Delivered:
                    return new OrderStatus[] { OrderStatus.Received };
                case OrderStatus.Received:
                    return new OrderStatus[] { };
                default:
                    return new OrderStatus[] { };
            }
        }

    }
}
