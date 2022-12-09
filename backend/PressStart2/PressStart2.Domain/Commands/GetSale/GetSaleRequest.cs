using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.GetSale
{
    public class GetSaleRequest : IRequest<CommandResponse>
    {
        public GetSaleRequest(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
    }
}
