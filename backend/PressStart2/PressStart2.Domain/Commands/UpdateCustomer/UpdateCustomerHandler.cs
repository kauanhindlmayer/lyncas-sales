using MediatR;
using PressStart2.Domain.Commands.GetCustomer;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.UpdateCustomer
{
    public class UpdateCustomerHandler : Notifiable, IRequestHandler<UpdateCustomerRequest, CommandResponse>
    {
        private readonly IRepositoryCustomer _repositoryCustomer;

        public UpdateCustomerHandler(IRepositoryCustomer repositoryCustomer)
        {
            _repositoryCustomer = repositoryCustomer;
        }

        public Task<CommandResponse> Handle(UpdateCustomerRequest request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                AddNotification(NotificationsConstants.CUSTOMER_MODULE, NotificationsConstants.INVALID_REQUEST);
                return Task.FromResult(new CommandResponse(this));
            }

            var customer = _repositoryCustomer.Get(request.Id);

            if (customer is null)
            {
                AddNotification(NotificationsConstants.CUSTOMER_MODULE, NotificationsConstants.CUSTOMER_NOT_FOUND);
                return Task.FromResult(new CommandResponse(this));
            }

            if (_repositoryCustomer.AlreadyExistsCPF(request.Cpf, request.Id))
            {
                AddNotification(NotificationsConstants.CUSTOMER_MODULE, NotificationsConstants.CUSTOMER_CPF_DUPLICATE);
                return Task.FromResult(new CommandResponse(this));
            }

            customer.Update(request.Name, request.Email, request.Phone, request.Cpf);

            _repositoryCustomer.Update(customer);
            _repositoryCustomer.Commit();

            return Task.FromResult(new CommandResponse(new UpdateCustomerResponse(NotificationsConstants.CUSTOMER_REGISTERED) ,this));
        }
    }
}
