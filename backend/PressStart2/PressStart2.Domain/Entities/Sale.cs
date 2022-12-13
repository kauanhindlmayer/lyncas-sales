using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class Sale : BaseEntity
    {
        private List<SaleItem> _items = new();
        public Guid CustomerId { get; private set; }
        public int QuantityItems { get; private set; }
        public DateTime SaleDate { get; private set; }
        public DateTime BillingDate { get; private set; }
        public decimal TotalValue { get; private set; }
        public virtual IEnumerable<SaleItem> Items => _items;

        public virtual Customer Customer { get; private set; }

        protected Sale() { }

        public Sale(Guid customerId, int quantityItems, DateTime billingDate, decimal totalValue)
        {
            CustomerId = customerId;
            QuantityItems = quantityItems; 
            SaleDate = DateTime.Now;
            BillingDate = billingDate;
            TotalValue = totalValue;

            this.AddSaleContract();
        }

        public void Update(Guid customerId, int quantityItems, DateTime billingDate, decimal totalValue)
        {
            CustomerId = customerId;
            QuantityItems = quantityItems;
            BillingDate = billingDate;
            TotalValue = totalValue;

            this.UpdateSaleContract();
        }

        public void AddItem(SaleItem saleItem)
        {
            AddNotifications(saleItem);
            _items.Add(saleItem);
        }

        public void UpdateItem(SaleItem saleItem)
        {
            var vi = _items.FirstOrDefault(p => p.Id == saleItem.Id);
            vi?.Update(saleItem.ItemDescription, saleItem.UnitaryValue, saleItem.Quantity, saleItem.TotalValue);

            AddNotifications(vi);
        }

        public void DeleteItem(SaleItem saleItem)
        {
            _items.Remove(saleItem);
        }
    }
}
