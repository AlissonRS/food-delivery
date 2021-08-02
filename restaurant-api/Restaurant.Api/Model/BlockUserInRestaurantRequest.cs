namespace Restaurants.Api.Model
{
    public class BlockUserInRestaurantRequest
    {
        public string UserEmail { get; set; }
        public string RestaurantId { get; set; }
    }
}
