using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class VendaItem : EntidadeBase // Agregada
    {
        public string DescricaoItem { get; private set; }
        public decimal ValorUnitario { get; private set; }
        public int Quantidade { get; private set; }
        public decimal ValorTotal { get; set; }

        // Construtor para o Entity Framework Core
        protected VendaItem() { }

        public VendaItem(string descricaoItem, decimal valorUnitario, int quantidade, decimal valorTotal)
        {
            DescricaoItem = descricaoItem;
            ValorUnitario = valorUnitario;
            Quantidade = quantidade;
            ValorTotal = valorTotal;

            this.AdicionarVendaItemContract();
        }

        public void Atualizar(string descricaoItem, decimal valorUnitario, int quantidade, decimal valorTotal)
        {
            DescricaoItem = descricaoItem;
            ValorUnitario = valorUnitario;
            Quantidade = quantidade;
            ValorTotal = valorTotal;

            this.AtualizarVendaItemContract();
        }

    }
}
