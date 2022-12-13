using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.GetSale
{
    public class GetSaleResponse
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime BillingDate { get; set; }
        public IEnumerable<SaleItemGetDTO> Items { get; set; }
    }
}
