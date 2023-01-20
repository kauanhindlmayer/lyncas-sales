using prmToolkit.NotificationPattern;


namespace PressStart2.Domain.Entities.Contracts
{
    public static class SaleContract
    {
        public static void AddSaleContract(this Sale sale)
        {
            new AddNotifications<Sale>(sale)
                .IfLowerOrEqualsThan(p => p.QuantityItems, 0, "A Venda precisa ter pelo menos um item.")
                .IfNull(p => p.SaleDate, "A Data da Venda precisa ser preenchida.")
                .IfNull(p => p.BillingDate, "A Data de Faturamento precisa ser preenchida.")
                .IfLowerOrEqualsThan(p => p.TotalValue, 0, "O Valor Total precisa ser maior que zero.");
        }

        public static void UpdateSaleContract(this Sale sale)
        {
            new AddNotifications<Sale>(sale)
                .IfLowerOrEqualsThan(p => p.QuantityItems, 0, "A Venda precisa ter pelo menos um item.")
                .IfNull(p => p.SaleDate, "A Data da Venda precisa ser preenchida.")
                .IfNull(p => p.BillingDate, "A Data de Faturamento precisa ser preenchida.")
                .IfLowerOrEqualsThan(p => p.TotalValue, 0, "O Valor Total precisa ser maior que zero.");
        }
    }
}
