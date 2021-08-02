using Orders.Domain.Enums;
using System;

namespace Orders.Api.Models
{
    public class OrderHistoryResponse
    {
        public DateTime CreatedAt { get; set; }
        public string StatusByUserId { get; set; }
        public OrderStatus OrderStatus { get; set; }
    }
}