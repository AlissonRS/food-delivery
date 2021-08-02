using System;

namespace Restaurants.Api.Model
{
    public class MealResponse
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string RestaurantId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}