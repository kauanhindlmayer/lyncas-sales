using AspNetCore.IQueryable.Extensions;
using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.GetAllCustomers
{
    public class GetAllCustomersHandler : Notifiable, IRequestHandler<GetAllCustomersRequest, CommandResponse>
    {
        private readonly IRepositoryCustomer _repositoryCustomer;

        public GetAllCustomersHandler(IRepositoryCustomer repositoryCustomer)
        {
            _repositoryCustomer = repositoryCustomer;
        }

        public Task<CommandResponse> Handle(GetAllCustomersRequest request, CancellationToken cancellationToken)
        {
            //var listCustomers = _repositoryCustomer.Query().Filter(request).Sort(request).Paginate(request);
            var listCustomers = _repositoryCustomer.Query().Apply(request);

            return Task.FromResult(new CommandResponse(listCustomers.Select(
                customer => new GetAllCustomersResponse(
                    customer.Id,
                    customer.Name,
                    customer.Email,
                    customer.Phone,
                    customer.Cpf,
                    customer.IsActive,
                    listCustomers.Count())), this));
        }
    }
}