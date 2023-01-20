using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class SaleItemContract
    {
        public static void AddSaleItemContract(this SaleItem saleItem)
        {
            new AddNotifications<SaleItem>(saleItem)
                .IfNullOrInvalidLength(p => p.ItemDescription, 1, 320, "A Descrição do Item precisa ser preenchida.")
                .IfLowerOrEqualsThan(p => p.UnitaryValue, 0, "O Valor Unitário precisa ser preenchido.")
                .IfLowerOrEqualsThan(p => p.Quantity, 0, "A quantidade precisa ser preenchida.")
                .IfLowerOrEqualsThan(p => p.TotalValue, 0, "O Valor Total precisa ser preenchido.");
        }

        public static void UpdateSaleItemContract(this SaleItem saleItem)
        {
            new AddNotifications<SaleItem>(saleItem)
                .IfNullOrInvalidLength(p => p.ItemDescription, 1, 320, "A Descrição do Item precisa ser preenchida.")
                .IfLowerOrEqualsThan(p => p.UnitaryValue, 0, "O Valor Unitário precisa ser preenchido.")
                .IfLowerOrEqualsThan(p => p.Quantity, 0, "A quantidade precisa ser preenchida.")
                .IfLowerOrEqualsThan(p => p.TotalValue, 0, "O Valor Total precisa ser preenchido.");
        }
    }
}