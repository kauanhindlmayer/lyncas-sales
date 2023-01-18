using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;
using System.Runtime.CompilerServices;

namespace PressStart2.Domain.Commands.DeleteCustomer
{
    public class DeleteCustomerHandler : Notifiable, IRequestHandler<DeleteCustomerRequest, CommandResponse>
    {
        private readonly IRepositoryCustomer _repositoryCustomer;
        private readonly IRepositorySale _repositorySale;

        public DeleteCustomerHandler(IRepositoryCustomer repositoryCustomer, IRepositorySale repositorySale)
        {
            _repositoryCustomer = repositoryCustomer;
            _repositorySale = repositorySale;
        }

        public Task<CommandResponse> Handle(DeleteCustomerRequest request, CancellationToken cancellationToken)
        {
            var customer = _repositoryCustomer.Get(request.Id);

            if (customer is null)
            {
                AddNotification(NotificationsConstants.CUSTOMER_MODULE, NotificationsConstants.CUSTOMER_NOT_FOUND);
                return Task.FromResult(new CommandResponse(this));
            }

            if (_repositorySale.CustomerHasSales(customer.Id))
            {
                customer.Inactivate(); 
                _repositoryCustomer.Update(customer);
                return Task.FromResult(new CommandResponse(new DeleteCustomerResponse(NotificationsConstants.CUSTOMER_DEACTIVATE), this));
            }
            else
            {
                _repositoryCustomer.Delete(customer);
            }


            _repositoryCustomer.Commit();

            return Task.FromResult(new CommandResponse(new DeleteCustomerResponse(NotificationsConstants.CUSTOMER_DELETED), this));
        }
    }
}
