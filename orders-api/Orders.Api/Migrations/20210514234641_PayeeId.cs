using Microsoft.EntityFrameworkCore.Migrations;

namespace Orders.Api.Migrations
{
    public partial class PayeeId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Orders_CreatedByUserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "PayeeId",
                table: "Orders",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PayerId",
                table: "Orders",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PayeeId",
                table: "Orders",
                column: "PayeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PayerId",
                table: "Orders",
                column: "PayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Orders_PayeeId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_PayerId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PayeeId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PayerId",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUserId",
                table: "Orders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CreatedByUserId",
                table: "Orders",
                column: "CreatedByUserId");
        }
    }
}
