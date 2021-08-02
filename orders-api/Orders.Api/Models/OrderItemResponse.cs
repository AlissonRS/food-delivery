namespace Orders.Api.Models
{
    public class OrderItemResponse
    {
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public int Quantity { get; internal set; }
    }
}