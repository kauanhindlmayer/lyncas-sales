﻿namespace PressStart2.Domain.Commands.GetSale
{
    public class GetAllSalesResponse
    {
        public int RecordsQuantity { get; }
        public List<GetAllSalesDetailsResponse> Sales { get; }

        public GetAllSalesResponse(int recordsQuantity, List<GetAllSalesDetailsResponse> sales)
        {
            RecordsQuantity = recordsQuantity;
            Sales = sales;
        }
    }

    public class GetAllSalesDetailsResponse
    {
        public GetAllSalesDetailsResponse(Guid id, string customer, int quantityItems, DateTime saleDate, DateTime billingDate, decimal totalValue)
        {
            Id = id;
            Customer = customer;
            QuantityItems = quantityItems;
            SaleDate = saleDate;
            BillingDate = billingDate;
            TotalValue = totalValue;
        }

        public Guid Id { get; }
        public string Customer { get; }
        public int QuantityItems { get; }
        public DateTime SaleDate { get; }
        public DateTime BillingDate { get; }
        public decimal TotalValue { get; }
    }
}
