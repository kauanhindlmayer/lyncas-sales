using MediatR;
using Microsoft.AspNetCore.Mvc;
using PressStart2.Domain.Commands.CreateCustomer;
using PressStart2.Domain.Commands.GetAllCustomers;

namespace PressStart2.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("listar")]
        public async Task<IActionResult> GetAll()
        {
            var getAllCustomers = await _mediator.Send(new GetAllCustomersRequest());
            return Ok(getAllCustomers);
        }

        //[HttpGet("obter{id}")]
        //public async Task<IActionResult> Get(Guid id)
        //{
        //    var getCustomer = await _mediator.Send(new GetCustomersRequest(id));
        //    return Ok(getCustomer);
        //}

        [HttpGet("criar")]
        public async Task<IActionResult> Create(CreateCustomerRequest request)
        {
            var response = await _mediator.Send(request);
            if (response.Success)
                return Created("", response);
            return BadRequest(response);
        }

        //[HttpGet("atualizar")]
        //public async Task<IActionResult> Update(UpdateCustomerRequest request)
        //{
            
        //}

        //[HttpGet("remover")]
        //public async Task<IActionResult> Delete(Guid id)
        //{
            
        //}
    }
}
