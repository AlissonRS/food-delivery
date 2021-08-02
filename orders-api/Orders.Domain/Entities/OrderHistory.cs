using Orders.Domain.Enums;

namespace Orders.Domain.Entities
{
    public class OrderHistory : BaseEntity
    {
        public string StatusByUserId { get; set; }
        public OrderStatus OrderStatus { get; set; }
    }
}