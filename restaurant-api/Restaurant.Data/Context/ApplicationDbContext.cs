using Microsoft.EntityFrameworkCore;
using Restaurants.Domain.Entities;
using System.Linq;

namespace Restaurants.Data.Context
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<RestaurantBlockedUsers> RestaurantBlockedUsers { get; set; }
        public DbSet<Meal> Meals { get; set; }

        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var cascadeFKs = builder.Model.GetEntityTypes()
               .SelectMany(t => t.GetForeignKeys())
               .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            // do not cascade
            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            // set all string columns' default length to 100 instead of max
            foreach (var property in builder.Model.GetEntityTypes().SelectMany(t => t.GetProperties()).Where(p => p.ClrType == typeof(string)))
            {
                if (property.GetMaxLength() == null)
                    property.SetMaxLength(100);
            }

            builder.Entity<Restaurant>().Property(m => m.Description).HasMaxLength(4000);
            builder.Entity<Restaurant>().HasMany(r => r.RestaurantBlockedUsers).WithOne(b => b.Restaurant);

            builder.Entity<RestaurantBlockedUsers>().HasIndex(b => new { b.RestaurantId, b.UserEmail }).IsUnique();

            builder.Entity<Meal>().Property(m => m.Description).HasMaxLength(4000);

        }
    }
}
