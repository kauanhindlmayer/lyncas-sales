using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class VendaItemContract
    {
        public static void AdicionarVendaItemContract(this VendaItem vendaItem)
        {
            new AddNotifications<VendaItem>(vendaItem)
                .IfNullOrInvalidLength(p => p.DescricaoItem, 1, 320)
                .IfLowerOrEqualsThan(p => p.ValorUnitario, 0)
                .IfLowerOrEqualsThan(p => p.Quantidade, 0)
                .IfLowerOrEqualsThan(p => p.ValorTotal, 0);

        }

        public static void AtualizarVendaItemContract(this VendaItem vendaItem)
        {
            new AddNotifications<VendaItem>(vendaItem)
                .IfNullOrInvalidLength(p => p.DescricaoItem, 1, 320)
                .IfLowerOrEqualsThan(p => p.ValorUnitario, 0)
                .IfLowerOrEqualsThan(p => p.Quantidade, 0)
                .IfLowerOrEqualsThan(p => p.ValorTotal, 0);
        }
    }
}