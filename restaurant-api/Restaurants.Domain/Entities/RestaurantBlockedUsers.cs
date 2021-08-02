namespace Restaurants.Domain.Entities
{
    public class RestaurantBlockedUsers : BaseEntity
    {
        public string RestaurantId { get; set; }
        public string UserEmail { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}