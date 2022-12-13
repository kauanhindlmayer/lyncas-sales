using prmToolkit.NotificationPattern;
using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;

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
                AddNotification(NotificationsConstants.SALE_MODULE, NotificationsConstants.INVALID_REQUEST);
                return Task.FromResult(new CommandResponse(this));
            }

            var customer = _repositoryCustomer.Get(request.CustomerId);

            if (customer is null)
                AddNotification(NotificationsConstants.SALE_MODULE, NotificationsConstants.CUSTOMER_NOT_FOUND);

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

            return Task.FromResult(new CommandResponse(new CreateSaleResponse(sale.Id, NotificationsConstants.SALE_REGISTERED), this));
        }
    }
}
   