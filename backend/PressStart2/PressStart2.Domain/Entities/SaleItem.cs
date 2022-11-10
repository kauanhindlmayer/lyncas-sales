using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class SaleItem : BaseEntity
    {
        public string ItemDescription { get; private set; }
        public decimal UnitaryValue { get; private set; }
        public int Quantity { get; private set; }
        public decimal TotalValue { get; set; }

        protected SaleItem() { }

        public SaleItem(string itemDescription, decimal unitaryValue, int quantity, decimal totalValue)
        {
            ItemDescription = itemDescription;
            UnitaryValue = unitaryValue;
            Quantity = quantity;
            TotalValue = totalValue;

            this.AddSaleItemContract();
        }

        public void Update(string itemDescription, decimal unitaryValue, int quantity, decimal totalValue)
        {
            ItemDescription = itemDescription;
            UnitaryValue = unitaryValue;
            Quantity = quantity;
            TotalValue = totalValue;

            this.UpdateSaleItemContract();
        }

    }
}
