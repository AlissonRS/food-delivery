namespace Orders.Api.Models
{
    public class OrderItemRequest
    {
        public decimal? Amount { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
    }
}