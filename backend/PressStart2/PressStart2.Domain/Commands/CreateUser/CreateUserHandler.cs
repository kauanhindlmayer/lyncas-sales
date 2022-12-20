using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Extensions;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.CreateUser
{
    public class CreateUserHandler : Notifiable, IRequestHandler<CreateUserRequest, CommandResponse>
    {
        private readonly IRepositoryUser _repositoryUser;

        public CreateUserHandler(IRepositoryUser repositoryUser)
        {
            _repositoryUser = repositoryUser;
        }

        public Task<CommandResponse> Handle(CreateUserRequest request, CancellationToken cancellationToken)
        {
            if (request.Password != request.PasswordConfirmation)
                AddNotification(NotificationsConstants.USER_MODULE, NotificationsConstants.USER_PASSWORD_NOT_MATCH);

            var user = new User(request.Login, request.Name, request.Password.EncryptPassword());
            AddNotifications(user);

            if (IsInvalid())
                return Task.FromResult(new CommandResponse(this));

            _repositoryUser.Add(user);
            _repositoryUser.Commit();

            return Task.FromResult(new CommandResponse(new CreateUserResponse(user.Id, NotificationsConstants.USER_REGISTERED), this));
        }
    }
}
