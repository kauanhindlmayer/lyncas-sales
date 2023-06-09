﻿using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.CreateCustomer
{
    //                                                                 Request object         Response object
    public class CreateCustomerHandler : Notifiable, IRequestHandler<CreateCustomerRequest, CommandResponse>
    {
        private readonly IRepositoryCustomer _repositoryCustomer;

        public CreateCustomerHandler(IRepositoryCustomer repositoryCustomer)
        {
            _repositoryCustomer = repositoryCustomer;
        }

        public Task<CommandResponse> Handle(CreateCustomerRequest request, CancellationToken cancellationToken)
        { 
            if (request is null)
            {
                AddNotification(NotificationsConstants.CUSTOMER_MODULE, NotificationsConstants.INVALID_REQUEST);
                return Task.FromResult(new CommandResponse(this));
            }

            if (_repositoryCustomer.AlreadyExistsCPF(request.Cpf))
            {
                AddNotification(NotificationsConstants.CUSTOMER_MODULE, NotificationsConstants.CUSTOMER_CPF_DUPLICATE);
                return Task.FromResult(new CommandResponse(this));
            }

            var customer = new Customer(request.Name, request.Email, request.Phone, request.Cpf);
            AddNotifications(customer);

            if (IsInvalid())
                return Task.FromResult(new CommandResponse(this));

            _repositoryCustomer.Add(customer);
            _repositoryCustomer.Commit();

            return Task.FromResult(new CommandResponse(new CreateCustomerResponse(customer.Id, NotificationsConstants.CUSTOMER_REGISTERED), this));
        }
    }
}
 