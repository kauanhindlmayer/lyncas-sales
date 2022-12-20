using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Extensions;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.UserLogin
{
    public class UserLoginHandler : Notifiable, IRequestHandler<UserLoginRequest, CommandResponse>
    {
        private readonly IRepositoryUser _repositoryUser;

        public UserLoginHandler(IRepositoryUser repositoryUser)
        {
           _repositoryUser = repositoryUser;
        }

        public Task<CommandResponse> Handle(UserLoginRequest request, CancellationToken cancellationToken)
        {
            var user = _repositoryUser.Authenticate(request.Login, request.Password.EncryptPassword());
            if (user is null)
            {
                AddNotification(NotificationsConstants.USER_MODULE, NotificationsConstants.USER_LOGIN_DATA_INCORRECT);
                return Task.FromResult(new CommandResponse(this));
            }

            return Task.FromResult(new CommandResponse(new UserLoginResponse(user.Id, user.Name), this));
        }
    }
}
