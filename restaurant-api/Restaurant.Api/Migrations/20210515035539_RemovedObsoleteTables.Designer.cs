// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Restaurants.Data.Context;

namespace Restaurants.Api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210515035539_RemovedObsoleteTables")]
    partial class RemovedObsoleteTables
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Restaurants.Domain.Entities.Meal", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(4000)")
                        .HasMaxLength(4000);

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("RestaurantId")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("RestaurantId");

                    b.ToTable("Meals");
                });

            modelBuilder.Entity("Restaurants.Domain.Entities.Restaurant", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(4000)")
                        .HasMaxLength(4000);

                    b.Property<int>("FoodType")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("OwnerId")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Restaurants");
                });

            modelBuilder.Entity("Restaurants.Domain.Entities.RestaurantBlockedUsers", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("RestaurantId")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("UserEmail")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("RestaurantId", "UserEmail")
                        .IsUnique()
                        .HasFilter("[RestaurantId] IS NOT NULL AND [UserEmail] IS NOT NULL");

                    b.ToTable("RestaurantBlockedUsers");
                });

            modelBuilder.Entity("Restaurants.Domain.Entities.Meal", b =>
                {
                    b.HasOne("Restaurants.Domain.Entities.Restaurant", "Restaurant")
                        .WithMany("Meals")
                        .HasForeignKey("RestaurantId");
                });

            modelBuilder.Entity("Restaurants.Domain.Entities.RestaurantBlockedUsers", b =>
                {
                    b.HasOne("Restaurants.Domain.Entities.Restaurant", "Restaurant")
                        .WithMany("RestaurantBlockedUsers")
                        .HasForeignKey("RestaurantId");
                });
#pragma warning restore 612, 618
        }
    }
}
