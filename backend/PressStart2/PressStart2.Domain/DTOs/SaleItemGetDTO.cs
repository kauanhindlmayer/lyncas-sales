namespace PressStart2.Domain.DTOs
{
    public class SaleItemGetDTO
    {
        public Guid Id { get; set; }
        public string ItemDescription { get; set; }
        public decimal UnitaryValue { get; set; }
        public int Quantity { get; set; }
        public decimal TotalValue { get; set; }
    }
}
