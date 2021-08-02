using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Orders.Api.Migrations
{
    public partial class RemovedLabels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderLabels");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderLabels",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    Key = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    OrderId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Value = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderLabels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderLabels_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderLabels_Key",
                table: "OrderLabels",
                column: "Key");

            migrationBuilder.CreateIndex(
                name: "IX_OrderLabels_OrderId",
                table: "OrderLabels",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderLabels_Value",
                table: "OrderLabels",
                column: "Value");
        }
    }
}
