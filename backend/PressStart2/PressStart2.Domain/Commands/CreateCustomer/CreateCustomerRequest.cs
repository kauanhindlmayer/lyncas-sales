using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.CreateCustomer
{
    public class CreateCustomerRequest : IRequest<CommandResponse>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Cpf { get; set; }
    }
}
 