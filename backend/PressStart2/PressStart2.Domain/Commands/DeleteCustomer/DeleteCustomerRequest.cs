using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.DeleteCustomer
{
    public class DeleteCustomerRequest : IRequest<CommandResponse>
    {
        public Guid Id { get; set; }

        public DeleteCustomerRequest(Guid id)
        {
            Id = id;
        }
    }
}
