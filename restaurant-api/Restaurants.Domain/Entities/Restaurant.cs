using Restaurants.Domain.Enums;
using System.Collections.Generic;

namespace Restaurants.Domain.Entities
{
    public class Restaurant : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public FoodType FoodType { get; set; }
        public string OwnerId { get; set; }
        public virtual ICollection<Meal> Meals { get; set; }
        public virtual ICollection<RestaurantBlockedUsers> RestaurantBlockedUsers { get; set; }

        public Restaurant()
        {
            this.Meals = new HashSet<Meal>();
            this.RestaurantBlockedUsers = new HashSet<RestaurantBlockedUsers>();
        }
    }
}
