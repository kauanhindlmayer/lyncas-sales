using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.GetCustomer
{
    public class GetCustomerRequest : IRequest<CommandResponse>
    {
        public Guid Id { get; }

        public GetCustomerRequest(Guid id)
        {
            Id = id;
        }
    }
}
