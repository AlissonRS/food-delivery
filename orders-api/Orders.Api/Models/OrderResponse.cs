using Orders.Domain.Enums;
using System;
using System.Collections.Generic;

namespace Orders.Api.Models
{
    public class OrderResponse
    {
        public string OrderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string PayerId { get; set; }
        public OrderStatus Status { get; set; }
        public decimal TotalAmount { get; set; }
        public string PayeeId { get; set; }
        public List<OrderItemResponse> Items { get; set; }
        public List<OrderHistoryResponse> History { get; set; }
    }
}
