using Orders.Domain.Enums;

namespace Orders.Api.Models
{
    public class UpdateOrderStatusRequest
    {
        public string OrderId { get; set; }
        public OrderStatus? Status { get; set; }
    }
}