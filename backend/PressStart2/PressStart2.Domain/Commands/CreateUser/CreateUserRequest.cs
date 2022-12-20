using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.CreateUser
{
    public class CreateUserRequest : IRequest<CommandResponse>
    {
        public string Login { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }
    }
}
