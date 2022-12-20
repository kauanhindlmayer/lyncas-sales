using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.UserLogin
{
    public class UserLoginRequest : IRequest<CommandResponse>
    {
        public UserLoginRequest(string login, string password)
        {
            Login = login;
            Password = password;
        }

        public string Login { get; set; }
        public string Password { get; set; }
    }
}
