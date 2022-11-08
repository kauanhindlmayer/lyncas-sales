﻿using prmToolkit.NotificationPattern;


namespace PressStart2.Domain.Entities.Contracts
{
    public static class VendaContract
    {
        public static void AdicionarVendaContract(this Venda venda)
        {
            new AddNotifications<Venda>(venda)
                .IfLowerOrEqualsThan(p => p.QuantidadeItens, 0)
                .IfNull(p => p.DataVenda)
                .IfNull(p => p.DataFaturamento)
                .IfLowerOrEqualsThan(p => p.ValorTotal, 0);
        }

        public static void AtualizarVendaContract(this Venda venda)
        {
            new AddNotifications<Venda>(venda)
                .IfLowerOrEqualsThan(p => p.QuantidadeItens, 0)
                .IfNull(p => p.DataVenda)
                .IfNull(p => p.DataFaturamento)
                .IfLowerOrEqualsThan(p => p.ValorTotal, 0);
        }
    }
}
