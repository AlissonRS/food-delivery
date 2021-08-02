using Restaurants.Domain.Enums;
using System;

namespace Restaurants.Api.Model
{
    public class RestaurantResponse
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public FoodType FoodType { get; set; }
        public string OwnerId { get; set; }
    }
}
