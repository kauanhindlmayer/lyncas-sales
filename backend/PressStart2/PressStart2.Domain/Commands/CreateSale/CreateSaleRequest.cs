using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.CreateSale
{
    public class CreateSaleRequest : IRequest<CommandResponse>
    {
        public Guid CustomerId { get; set; }
        public DateTime BillingDate { get; set; }
        public List<SaleItemCreateDTO> Items { get; set; }
    }
}
