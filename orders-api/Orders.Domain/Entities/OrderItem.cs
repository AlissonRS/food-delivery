namespace Orders.Domain.Entities
{
    public class OrderItem : BaseEntity
    {
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int Quantity { get; set; }
    }
}