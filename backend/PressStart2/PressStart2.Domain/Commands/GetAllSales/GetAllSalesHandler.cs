using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.GetSale
{
    public class GetAllSalesHandler : Notifiable, IRequestHandler<GetAllSalesRequest, CommandResponse>
    {
        private readonly IRepositorySale _repositorySale;

        public GetAllSalesHandler(IRepositorySale repositorySale)
        {
            _repositorySale = repositorySale;
        }

        public Task<CommandResponse> Handle(GetAllSalesRequest request, CancellationToken cancellationToken)
        {
            var salesList = _repositorySale.GetAllWithDependency();

            return Task.FromResult(
                new CommandResponse(salesList.Select(
                    sale => new GetAllSalesResponse(sale.Id, sale.Customer.Name, sale.QuantityItems, sale.SaleDate, sale.BillingDate, sale.TotalValue)), this));
        }
    }
}
