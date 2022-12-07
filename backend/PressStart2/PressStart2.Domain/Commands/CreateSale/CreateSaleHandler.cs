using prmToolkit.NotificationPattern;
using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;

namespace PressStart2.Domain.Commands.CreateSale
{
    public class CreateSaleHandler : Notifiable, IRequestHandler<CreateSaleRequest, CommandResponse>
    {
        private readonly IRepositorySale _repositorySale;
        private readonly IRepositoryCustomer _repositoryCustomer;

        public CreateSaleHandler(IRepositorySale repositorySale, IRepositoryCustomer repositoryCustomer)
        {
            _repositorySale = repositorySale;
            _repositoryCustomer = repositoryCustomer;   
        }

        public Task<CommandResponse> Handle(CreateSaleRequest request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                AddNotification("CreateSaleHandler", "Request Inválido");
                return Task.FromResult(new CommandResponse(this));
            }

            var customer = _repositoryCustomer.Get(request.CustomerId);

            if (customer is null)
                AddNotification("CreateSaleHandler", "Cliente não localizado");

            var sale = new Sale(request.CustomerId, request.Items.Count, request.BillingDate, request.Items.Sum(p => p.TotalValue));

            request.Items.ForEach(saleItem =>
            {
                sale.AddItem(new SaleItem(saleItem.ItemDescription, saleItem.UnitaryValue, saleItem.Quantity, saleItem.TotalValue));
            });

            AddNotifications(sale);

            if (IsInvalid())
                return Task.FromResult(new CommandResponse(this));

            _repositorySale.Add(sale);
            _repositorySale.Commit();

            // return Task.FromResult(new CommandResponse(new CreateSaleResponse(customer.Id, NotificationsConstants.CUSTOMER_REGISTERED), this));
            return Task.FromResult(new CommandResponse(new CreateSaleResponse(sale.Id, "Venda Registrada com Sucesso."), this));
        }
    }
}
   