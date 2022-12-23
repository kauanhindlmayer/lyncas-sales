using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PressStart2.Domain.Commands.CreateCustomer;
using PressStart2.Domain.Commands.CreateUser;
using PressStart2.Domain.Commands.UserLogin;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PressStart2.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;

        public UserController(IMediator mediator, IConfiguration configuration)
        {
            _mediator = mediator;
            _configuration = configuration; 
        }

        [HttpPost("autenticar")]
        public async Task<IActionResult> Authenticate(UserLoginRequest request)
        {
            var commandResponse = await _mediator.Send(request);

            if (!commandResponse.Success)
                return BadRequest(commandResponse);

            var user = (UserLoginResponse)commandResponse.Data;

            var claims = new[]
            {
                new Claim("userId", user.Id.ToString()),
                new Claim("userName", user.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "PressStart2",
                audience: "PressStart2",
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            return Ok(new
            {
                UserName = user.Name,
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }

        [HttpPost("adicionar")]
        public async Task<IActionResult> Create(CreateUserRequest request)
        {
            var response = await _mediator.Send(request);
            if (response.Success)
                return Created("", response);
            return BadRequest(response);
        }
    }
}
