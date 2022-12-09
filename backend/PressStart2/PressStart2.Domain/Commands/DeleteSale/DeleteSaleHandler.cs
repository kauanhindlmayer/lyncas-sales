using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
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
            var sale = _repositorySale.Get(request.Id);

            if (sale is null)
            {
                AddNotification("DeleteSaleHandler", "Venda não Localizada.");
                return Task.FromResult(new CommandResponse(this));
            }

            _repositorySale.Delete(sale);
            _repositorySale.Commit();

            return Task.FromResult(new CommandResponse(new DeleteSaleResponse("Venda Removida com Sucesso."), this));
        }
    }
}
