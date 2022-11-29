using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
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
                AddNotification("GetCustomerHandler", "Request inválido!");
                return Task.FromResult(new CommandResponse(this));
            }

            var customer = _repositoryCustomer.Get(request.Id);

            if (customer is null)
            {
                AddNotification("GetCustomerHandler", "Cliente não Localizado!");
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
