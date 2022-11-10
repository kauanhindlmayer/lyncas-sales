using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class SaleItemContract
    {
        public static void AddSaleItemContract(this SaleItem saleItem)
        {
            new AddNotifications<SaleItem>(saleItem)
                .IfNullOrInvalidLength(p => p.ItemDescription, 1, 320)
                .IfLowerOrEqualsThan(p => p.UnitaryValue, 0)
                .IfLowerOrEqualsThan(p => p.Quantity, 0)
                .IfLowerOrEqualsThan(p => p.TotalValue, 0);

        }

        public static void UpdateSaleItemContract(this SaleItem saleItem)
        {
            new AddNotifications<SaleItem>(saleItem)
                .IfNullOrInvalidLength(p => p.ItemDescription, 1, 320)
                .IfLowerOrEqualsThan(p => p.UnitaryValue, 0)
                .IfLowerOrEqualsThan(p => p.Quantity, 0)
                .IfLowerOrEqualsThan(p => p.TotalValue, 0);
        }
    }
}