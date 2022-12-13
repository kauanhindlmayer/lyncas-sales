using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.GetSale
{
    public class GetSaleHandler : Notifiable, IRequestHandler<GetSaleRequest, CommandResponse>
    {
        private readonly IRepositorySale _repositorySale;

        public GetSaleHandler(IRepositorySale repositorySale)
        {
            _repositorySale = repositorySale;
        }

        public Task<CommandResponse> Handle(GetSaleRequest request, CancellationToken cancellationToken)
        {
            var sale = _repositorySale.GetWithDependency(request.Id);

            if (sale is null)
            {
                AddNotification(NotificationsConstants.SALE_MODULE, NotificationsConstants.SALE_NOT_FOUND);
                return Task.FromResult(new CommandResponse(this));
            }

            return Task.FromResult(new CommandResponse(new GetSaleResponse
            {
                Id = sale.Id,
                CustomerId = sale.CustomerId,
                CustomerName = sale.Customer.Name,
                BillingDate = sale.BillingDate,
                Items = sale.Items.Select(saleItem => new SaleItemGetDTO
                {
                    Id = saleItem.Id,
                    ItemDescription = saleItem.ItemDescription,
                    UnitaryValue = saleItem.UnitaryValue,
                    Quantity = saleItem.Quantity,
                    TotalValue = saleItem.TotalValue,
                })
            }, this));
        }
    }
}
