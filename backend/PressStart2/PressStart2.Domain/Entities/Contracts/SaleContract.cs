using prmToolkit.NotificationPattern;


namespace PressStart2.Domain.Entities.Contracts
{
    public static class SaleContract
    {
        public static void AddSaleContract(this Sale sale)
        {
            new AddNotifications<Sale>(sale)
                .IfLowerOrEqualsThan(p => p.QuantityItems, 0)
                .IfNull(p => p.SaleDate)
                .IfNull(p => p.BillingDate)
                .IfLowerOrEqualsThan(p => p.TotalValue, 0);
        }

        public static void UpdateSaleContract(this Sale sale)
        {
            new AddNotifications<Sale>(sale)
                .IfLowerOrEqualsThan(p => p.QuantityItems, 0)
                .IfNull(p => p.SaleDate)
                .IfNull(p => p.BillingDate)
                .IfLowerOrEqualsThan(p => p.TotalValue, 0);
        }
    }
}
