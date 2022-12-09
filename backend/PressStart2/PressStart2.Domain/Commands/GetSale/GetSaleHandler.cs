using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
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
            var sale = _repositorySale.Get(request.Id);

            if (sale is null)
            {
                AddNotification("GetSaleHandler", "Venda não encontrada.");
                return Task.FromResult(new CommandResponse(this));
            }

            return Task.FromResult(new CommandResponse(new GetSaleResponse
            {
                Id = sale.Id,
                CustomerId = sale.CustomerId,
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
