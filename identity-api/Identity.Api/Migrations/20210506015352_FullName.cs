using Microsoft.EntityFrameworkCore.Migrations;

namespace Identity.Api.Migrations
{
    public partial class FullName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "AspNetUsers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "RegularUser",
                column: "ConcurrencyStamp",
                value: "e8451e68-6c5f-4574-8557-dc1c342e3f6e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "RestaurantOwner",
                column: "ConcurrencyStamp",
                value: "9638d52d-76db-429c-9d3e-622aee260ad2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "RegularUser",
                column: "ConcurrencyStamp",
                value: "9be68e26-b821-4bcc-aa9b-b769876494d5");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "RestaurantOwner",
                column: "ConcurrencyStamp",
                value: "4ba073bf-7d47-4914-bbc4-81621cf50b80");
        }
    }
}
