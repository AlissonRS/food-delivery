using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Restaurants.Api.Migrations
{
    public partial class RemovedObsoleteTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RestaurantBlockedUsers_ApplicationUser_UserId",
                table: "RestaurantBlockedUsers");

            migrationBuilder.DropTable(
                name: "ApplicationUser");

            migrationBuilder.DropIndex(
                name: "IX_RestaurantBlockedUsers_UserId",
                table: "RestaurantBlockedUsers");

            migrationBuilder.DropIndex(
                name: "IX_RestaurantBlockedUsers_RestaurantId_UserId",
                table: "RestaurantBlockedUsers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RestaurantBlockedUsers");

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "RestaurantBlockedUsers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantBlockedUsers_RestaurantId_UserEmail",
                table: "RestaurantBlockedUsers",
                columns: new[] { "RestaurantId", "UserEmail" },
                unique: true,
                filter: "[RestaurantId] IS NOT NULL AND [UserEmail] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RestaurantBlockedUsers_RestaurantId_UserEmail",
                table: "RestaurantBlockedUsers");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "RestaurantBlockedUsers");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "RestaurantBlockedUsers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ApplicationUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    SecurityStamp = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUser", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantBlockedUsers_UserId",
                table: "RestaurantBlockedUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantBlockedUsers_RestaurantId_UserId",
                table: "RestaurantBlockedUsers",
                columns: new[] { "RestaurantId", "UserId" },
                unique: true,
                filter: "[RestaurantId] IS NOT NULL AND [UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_RestaurantBlockedUsers_ApplicationUser_UserId",
                table: "RestaurantBlockedUsers",
                column: "UserId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
