using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.DeleteSale
{
    public class DeleteSaleRequest : IRequest<CommandResponse>
    {
        public DeleteSaleRequest(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
    }
}
