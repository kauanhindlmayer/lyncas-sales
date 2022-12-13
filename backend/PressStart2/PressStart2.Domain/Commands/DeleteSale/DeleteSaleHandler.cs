using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.DeleteSale
{
    public class DeleteSaleHandler : Notifiable, IRequestHandler<DeleteSaleRequest, CommandResponse>
    {
        private readonly IRepositorySale _repositorySale;

        public DeleteSaleHandler(IRepositorySale repositorySale)
        {
            _repositorySale = repositorySale;
        }

        public Task<CommandResponse> Handle(DeleteSaleRequest request, CancellationToken cancellationToken)
        {
            var sale = _repositorySale.GetWithDependency(request.Id);

            if (sale is null)
            {
                AddNotification(NotificationsConstants.SALE_MODULE, NotificationsConstants.SALE_NOT_FOUND);
                return Task.FromResult(new CommandResponse(this));
            }

            // Convert from IEnumerable to List
            sale.Items.ToList().ForEach(saleItem => sale.DeleteItem(saleItem));

            _repositorySale.Delete(sale);
            _repositorySale.Commit();

            return Task.FromResult(new CommandResponse(new DeleteSaleResponse(NotificationsConstants.SALE_DELETED), this));
        }
    }
}
 