﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using PressStart2.Domain.Commands.CreateSale;
using PressStart2.Domain.Commands.GetAllCustomers;
using PressStart2.Domain.Commands.GetSale;

namespace PressStart2.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : Controller
    {
        
        private readonly IMediator _mediator;

        public SaleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("listar")]
        public async Task<IActionResult> GetAll(Guid id)
        {
            var salesList = await _mediator.Send(new GetAllSalesRequest());
            return Ok(salesList);
        }

        [HttpPost("adicionar")]
        public async Task<IActionResult> Create(CreateSaleRequest request)
        {
            var response = await _mediator.Send(request);
            if (response.Success)
                return Created("", response);

            return BadRequest(response);
        }
    }
}
 