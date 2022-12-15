using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PressStart2.Infra.Data.Migrations
{
    public partial class SaleMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaleDbSet_Customer_CustomerId",
                table: "SaleDbSet");

            migrationBuilder.DropForeignKey(
                name: "FK_SaleItemDbSet_SaleDbSet_SaleId",
                table: "SaleItemDbSet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SaleDbSet",
                table: "SaleDbSet");

            migrationBuilder.RenameTable(
                name: "SaleDbSet",
                newName: "Sale");

            migrationBuilder.RenameIndex(
                name: "IX_SaleDbSet_CustomerId",
                table: "Sale",
                newName: "IX_Sale_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sale",
                table: "Sale",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sale_Customer_CustomerId",
                table: "Sale",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SaleItemDbSet_Sale_SaleId",
                table: "SaleItemDbSet",
                column: "SaleId",
                principalTable: "Sale",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sale_Customer_CustomerId",
                table: "Sale");

            migrationBuilder.DropForeignKey(
                name: "FK_SaleItemDbSet_Sale_SaleId",
                table: "SaleItemDbSet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sale",
                table: "Sale");

            migrationBuilder.RenameTable(
                name: "Sale",
                newName: "SaleDbSet");

            migrationBuilder.RenameIndex(
                name: "IX_Sale_CustomerId",
                table: "SaleDbSet",
                newName: "IX_SaleDbSet_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SaleDbSet",
                table: "SaleDbSet",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SaleDbSet_Customer_CustomerId",
                table: "SaleDbSet",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SaleItemDbSet_SaleDbSet_SaleId",
                table: "SaleItemDbSet",
                column: "SaleId",
                principalTable: "SaleDbSet",
                principalColumn: "Id");
        }
    }
}
