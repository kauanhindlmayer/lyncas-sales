using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class Venda : EntidadeBase // Agregadora - agrega funcionalidades da classe VendaItem
    {
        private List<VendaItem> _itens = new();
        public Guid ClienteId { get; private set; }
        public int QuantidadeItens { get; private set; }
        public DateTime DataVenda { get; private set; }
        public DateTime DataFaturamento { get; private set; }
        public decimal ValorTotal { get; private set; }
        public virtual IEnumerable<VendaItem> Itens => _itens;

        // Propriedade de Navegabilidade
        public virtual Cliente Cliente { get; private set; }

        // Construtor para o Entity Framework Core
        protected Venda() { }
        
        public Venda(Guid clienteId, int quantidadeItens, DateTime dataFaturamento, decimal valorTotal)
        {
            ClienteId = clienteId;
            QuantidadeItens = quantidadeItens;
            DataVenda = DateTime.Now;
            DataFaturamento = dataFaturamento;
            ValorTotal = valorTotal;

            this.AdicionarVendaContract();
        }

        public void Atualizar(Guid clienteId, int quantidadeItens, DateTime dataFaturamento, decimal valorTotal)
        {
            ClienteId = clienteId;
            QuantidadeItens = quantidadeItens;
            DataFaturamento = dataFaturamento;
            ValorTotal = valorTotal;

            this.AtualizarVendaContract();
        }

        public void AdicionarItem(VendaItem vendaItem)
        {
            AddNotifications(vendaItem);
            _itens.Add(vendaItem);
        }

        public void AtualizarItem(VendaItem vendaItem)
        {
            var vi = _itens.FirstOrDefault(p => p.Id == vendaItem.Id);
            vi?.Atualizar(vendaItem.DescricaoItem, vendaItem.ValorUnitario, vendaItem.Quantidade, vendaItem.ValorTotal);

            AddNotifications(vi);
        }

        public void RemoverItem(VendaItem vendaItem)
        {
            _itens.Remove(vendaItem);
        }
    }
}
