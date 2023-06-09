﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PressStart2.Domain.Commands.CreateCustomer;
using PressStart2.Domain.Commands.DeleteCustomer;
using PressStart2.Domain.Commands.GetAllCustomers;
using PressStart2.Domain.Commands.GetCustomer;
using PressStart2.Domain.Commands.UpdateCustomer;
using prmToolkit.NotificationPattern;

namespace PressStart2.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [ProducesResponseType(typeof(GetAllCustomersResponse), 200)]
        [ProducesResponseType(typeof(IEnumerable<Notification>), 400)]
        [HttpGet("listar")]
        public async Task<IActionResult> GetAll([FromQuery] GetAllCustomersRequest request)
        {
            var getAllCustomers = await _mediator.Send(request);
            return Ok(getAllCustomers);
        }

        [HttpGet("obter/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var customer = await _mediator.Send(new GetCustomerRequest(id));
            return Ok(customer);
        }

        [HttpPost("adicionar")]
        public async Task<IActionResult> Create(CreateCustomerRequest request)
        {
            var response = await _mediator.Send(request);
            if (response.Success)
                return Created("", response);
            return BadRequest(response);
        }

        [HttpPut("atualizar")]
        public async Task<IActionResult> Update(UpdateCustomerRequest request)
        {
            var response = await _mediator.Send(request);
            if (response.Success)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpDelete("remover/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _mediator.Send(new DeleteCustomerRequest(id));
            if (response.Success)
                return Ok(response);

            return BadRequest(response);
        }
    }
}
