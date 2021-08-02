using Restaurants.Domain.Enums;

namespace Restaurants.Api.Model
{
    public class CreateRestaurantRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public FoodType FoodType { get; set; }
    }
}
