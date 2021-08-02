using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;
using System.Linq;

namespace Orders.Data.Context
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderHistory> OrderHistory { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

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

            builder.Entity<Order>().Property(m => m.PayerId).IsRequired();
            builder.Entity<Order>().HasIndex(m => m.PayerId);

            builder.Entity<Order>().Property(m => m.PayeeId).IsRequired();
            builder.Entity<Order>().HasIndex(m => m.PayeeId);

            builder.Entity<OrderHistory>().Property(m => m.StatusByUserId).IsRequired();

            builder.Entity<OrderItem>().Property(m => m.Description).HasMaxLength(512).IsRequired();
        }
    }
}
