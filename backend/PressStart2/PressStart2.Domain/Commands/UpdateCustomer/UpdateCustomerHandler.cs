using MediatR;
using PressStart2.Domain.Commands.GetCustomer;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
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
                AddNotification("UpdateCustomerHandler", "Request inválido!");
                return Task.FromResult(new CommandResponse(this));
            }

            var customer = _repositoryCustomer.Get(request.Id);

            if (customer is null)
            {
                AddNotification("UpdateCustomerHandler", "Cliente não Localizado!");
                return Task.FromResult(new CommandResponse(this));
            }

            if (_repositoryCustomer.AlreadyExistsCPF(request.Cpf, request.Id))
            {
                AddNotification("UpdateCustomerHandler", "CPF já existente no Sistema!");
                return Task.FromResult(new CommandResponse(this));
            }

            customer.Update(request.Name, request.Email, request.Phone, request.Cpf);

            _repositoryCustomer.Update(customer);
            _repositoryCustomer.Commit();

            return Task.FromResult(new CommandResponse(new UpdateCustomerResponse("Cliente Atualizado com Sucesso!") ,this));
        }
    }
}
