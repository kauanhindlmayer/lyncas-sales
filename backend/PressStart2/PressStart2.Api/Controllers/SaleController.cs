using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PressStart2.Domain.Commands.CreateSale;
using PressStart2.Domain.Commands.DeleteSale;
using PressStart2.Domain.Commands.GetAllCustomers;
using PressStart2.Domain.Commands.GetSale;
using PressStart2.Domain.Commands.UpdateSale;
using prmToolkit.NotificationPattern;

namespace PressStart2.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SaleController : Controller
    {
        
        private readonly IMediator _mediator;

        public SaleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("listar")]
        public async Task<IActionResult> GetAll([FromQuery] GetAllSalesRequest request)
        {
            var response = await _mediator.Send(request);
            if (response.Success)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("obter/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var sale = await _mediator.Send(new GetSaleRequest(id));
            return Ok(sale);
        }

        [HttpPost("adicionar")]
        public async Task<IActionResult> Create(CreateSaleRequest request)
        {
            var response = await _mediator.Send(request);
            if (response.Success)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpPut("atualizar")]
        public async Task<IActionResult> Update(UpdateSaleRequest request)
        {
            var response = await _mediator.Send(request);
            if (response.Success)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpDelete("remover/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _mediator.Send(new DeleteSaleRequest(id));
            if (response.Success)
                return Ok(response);

            return BadRequest(response);
        }
    }
}
 