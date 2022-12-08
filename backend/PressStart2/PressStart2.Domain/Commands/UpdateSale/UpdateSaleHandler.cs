using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.UpdateSale
{
    public class UpdateSaleHandler : Notifiable, IRequestHandler<UpdateSaleRequest, CommandResponse>
    {
        private readonly IRepositorySale _repositorySale;
        private readonly IRepositoryCustomer _repositoryCustomer;

        public UpdateSaleHandler(IRepositorySale repositorySale, IRepositoryCustomer repositoryCustomer)
        {
            _repositorySale = repositorySale;
            _repositoryCustomer = repositoryCustomer;
        }

        public Task<CommandResponse> Handle(UpdateSaleRequest request, CancellationToken cancellationToken)
        {
            var sale = _repositorySale.Get(request.Id);

            if (sale is null)
            {
                AddNotification("UpdateSaleHandler", "Venda não localizada.");
                return Task.FromResult(new CommandResponse(this));
            }

            var customer = _repositoryCustomer.Get(request.CustomerId);

            if (customer is null)
                AddNotification("UpdateSaleHandler", "Cliente não localizado.");

            sale.Update(request.CustomerId, request.Items.Count, request.BillingDate, request.Items.Sum(p => p.TotalValue));

            sale.Items.ToList().ForEach(saleItem => sale.DeleteItem(saleItem));

            request.Items.ForEach(saleItem =>
            {
                sale.AddItem(new SaleItem(saleItem.ItemDescription, saleItem.UnitaryValue, saleItem.Quantity, saleItem.TotalValue));
            });

            AddNotifications(sale);

            if (IsInvalid())
                return Task.FromResult(new CommandResponse(this));

            _repositorySale.Update(sale);
            _repositorySale.Commit();

            return Task.FromResult(new CommandResponse(new UpdateSaleResponse("Venda Atualizada com Sucesso."), this));
        }
    }
}
