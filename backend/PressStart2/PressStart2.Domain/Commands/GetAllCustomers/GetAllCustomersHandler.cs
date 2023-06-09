﻿using AspNetCore.IQueryable.Extensions;
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

            
            var listCustomerDetailsResponse = listCustomers.Select(
                customer => new GetAllCustomersDetailsResponse(
                    customer.Id,
                    customer.Name,
                    customer.Email,
                    customer.Phone,
                    customer.Cpf,
                    customer.IsActive
                    )).ToList();

            var listCustomerResponse = new GetAllCustomersResponse(listCustomers.Count(), listCustomerDetailsResponse);


            return Task.FromResult(new CommandResponse(listCustomerResponse, this));
        }
    }
} 