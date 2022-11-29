using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.UpdateCustomer
{
    public class UpdateCustomerRequest : IRequest<CommandResponse>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Cpf { get; set; }
    }
}
