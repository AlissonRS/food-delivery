using System;
using System.Collections.Generic;

namespace Restaurants.Domain.Entities
{
    public class BaseEntity
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; }

        public BaseEntity()
        {
            this.Id = Guid.NewGuid().ToString();
            this.CreatedAt = DateTime.UtcNow;
            this.IsDeleted = false;
        }
    }
}
