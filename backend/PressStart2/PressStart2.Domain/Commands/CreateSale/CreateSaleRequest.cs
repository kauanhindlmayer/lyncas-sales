using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.CreateSale
{
    public class CreateSaleRequest : IRequest<CommandResponse>
    {
        public Guid CustomerId { get; private set; }
        public int QuantityItems { get; private set; }
        public DateTime BillingDate { get; private set; }
        public decimal TotalValue { get; private set; }
    }
}
