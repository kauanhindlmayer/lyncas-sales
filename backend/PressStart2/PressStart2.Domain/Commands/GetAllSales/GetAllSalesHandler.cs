using AspNetCore.IQueryable.Extensions;
using AspNetCore.IQueryable.Extensions.Filter;
using AspNetCore.IQueryable.Extensions.Pagination;
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
            var listSales = _repositorySale.GetAllWithDependency().Filter(request).Paginate(request).ToList();

            var listSalesDetailsResponse = listSales.Select(
                    sale => new GetAllSalesDetailsResponse(sale.Id, sale.Customer.Name, sale.QuantityItems, sale.SaleDate, sale.BillingDate, sale.TotalValue)).ToList();

            var listSalesResponse = new GetAllSalesResponse(listSales.Count(), listSalesDetailsResponse);

            return Task.FromResult(
                new CommandResponse(listSalesResponse, this));
        }
    }
}
