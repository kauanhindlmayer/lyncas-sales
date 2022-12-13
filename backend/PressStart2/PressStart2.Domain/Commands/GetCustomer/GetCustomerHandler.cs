using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.GetCustomer
{
    public class GetCustomerHandler : Notifiable, IRequestHandler<GetCustomerRequest, CommandResponse>
    {
        private readonly IRepositoryCustomer _repositoryCustomer;

        public GetCustomerHandler(IRepositoryCustomer repositoryCustomer)
        {
            _repositoryCustomer = repositoryCustomer;
        }

        public Task<CommandResponse> Handle(GetCustomerRequest request, CancellationToken cancellationToken)
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

            return Task.FromResult(
                new CommandResponse(
                    new GetCustomerResponse(
                        customer.Id,
                        customer.Name,
                        customer.Email,
                        customer.Phone,
                        customer.Cpf,
                        customer.IsActive),
                    this));
        }
    }
}
