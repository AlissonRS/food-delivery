using System.Collections.Generic;

namespace Orders.Api.Models
{
    public class CreateOrderRequest
    {
        public string PayeeId { get; set; }
        public virtual IEnumerable<OrderItemRequest> Items { get; set; }
    }
}
