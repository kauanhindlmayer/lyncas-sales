using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using prmToolkit.NotificationPattern;
using System.Runtime.CompilerServices;

namespace PressStart2.Domain.Commands.DeleteCustomer
{
    public class DeleteCustomerHandler : Notifiable, IRequestHandler<DeleteCustomerRequest, CommandResponse>
    {
        private readonly IRepositoryCustomer _repositoryCustomer;

        public DeleteCustomerHandler(IRepositoryCustomer repositoryCustomer)
        {
            _repositoryCustomer = repositoryCustomer;
        }

        public Task<CommandResponse> Handle(DeleteCustomerRequest request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                AddNotification("DeleteCustomerHandle", "Request inválido!");
                return Task.FromResult(new CommandResponse(this));
            }

            var customer = _repositoryCustomer.Get(request.Id);

            if (customer is null)
            {
                AddNotification("DeleteCustomerHandle", "Cliente não Localizado!");
                return Task.FromResult(new CommandResponse(this));
            }

            _repositoryCustomer.Delete(customer);
            _repositoryCustomer.Commit();

            return Task.FromResult(new CommandResponse(new DeleteCustomerResponse("Cliente Removido com Sucesso!"), this));
        }
    }
}
