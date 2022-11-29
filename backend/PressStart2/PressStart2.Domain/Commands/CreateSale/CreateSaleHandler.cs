using prmToolkit.NotificationPattern;
using MediatR;
using PressStart2.Domain.Commands.CreateCustomer;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;

namespace PressStart2.Domain.Commands.CreateSale
{
    public class CreateSaleHandler : Notifiable, IRequestHandler<CreateSaleRequest, CommandResponse>
    {
        private readonly IRepositorySale _repositorySale;

        public CreateSaleHandler(IRepositorySale repositorySale)
        {
            _repositorySale = repositorySale;
        }

        public Task<CommandResponse> Handle(CreateSaleRequest request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                // (NotificationsConstants.CUSTOMER_MODULE, NotificationsConstants.INVALID_REQUEST);
                AddNotification("CreateSaleHandler", "Request Inválido");
                return Task.FromResult(new CommandResponse(this));
            }

            var sale = new Sale(request.CustomerId, request.QuantityItems, request.BillingDate, request.TotalValue);
            AddNotifications(sale);

            // Notifiable
            if (IsInvalid())
                return Task.FromResult(new CommandResponse(this));

            _repositorySale.Add(sale);
            _repositorySale.Commit();

            // return Task.FromResult(new CommandResponse(new CreateCustomerResponse(customer.Id, NotificationsConstants.CUSTOMER_REGISTERED), this));
            return Task.FromResult(new CommandResponse(new CreateSaleResponse(sale.CustomerId, "Venda Registrada com Sucesso."), this));
        }
    }
}
