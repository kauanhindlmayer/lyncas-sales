namespace PressStart2.Domain.DTOs
{
    public class SaleItemAddDTO
    {
        public string ItemDescription { get; private set; }
        public decimal UnitaryValue { get; private set; }
        public int Quantity { get; private set; }
        public decimal TotalValue { get; set; }

    }
}
