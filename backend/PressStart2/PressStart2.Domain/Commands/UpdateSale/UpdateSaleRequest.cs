using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.UpdateSale
{
    public class UpdateSaleRequest : IRequest<CommandResponse>
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public DateTime BillingDate { get; set; }
        public List<SaleItemCreateDTO> Items { get; set; }
    }
}
